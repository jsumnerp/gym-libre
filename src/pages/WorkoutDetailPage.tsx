import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { openDB } from 'idb'
import { ExerciseCard } from '@/components/ui/ExerciseCard'
import type { Workout, GymLibreDB } from '@/types/db'
import { PageLayout } from '@/components/layout/PageLayout'

export const WorkoutDetailPage = () => {
  const { id } = useParams()
  const [workout, setWorkout] = useState<Workout | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        if (!id) return
        const db = await openDB<GymLibreDB>('gym-libre-db', 1)
        const tx = db.transaction('workouts', 'readonly')
        const store = tx.objectStore('workouts')
        const workoutData = await store.get(Number(id))
        setWorkout(workoutData || null)
        setError(null)
      } catch (err) {
        console.error(err)
        setError('Failed to load workout')
      } finally {
        setLoading(false)
      }
    }
    fetchWorkout()
  }, [id])

  if (!workout && !loading && !error) {
    return (
      <PageLayout title="Workout not found">
        <div>Workout not found</div>
      </PageLayout>
    )
  }

  return (
    <PageLayout title={workout?.name ?? ''} loading={loading} error={error}>
      {workout?.exercises.map((exercise, idx) => (
        <ExerciseCard
          key={exercise.id ?? idx}
          exerciseName={exercise.name}
          sets={exercise.sets}
          readonly={true}
        />
      ))}
    </PageLayout>
  )
}
