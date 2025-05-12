import { useWorkouts } from '@/hooks/useWorkouts'
import type { Workout as WorkoutType } from '@/types/db'
import { WorkoutCard } from '@/components/ui/WorkoutCard'
import { useEffect, useState } from 'react'
import { PageLayout } from '@/components/layout/PageLayout'

export const WorkoutsPage = () => {
  const { workouts: initialWorkouts, loading, error } = useWorkouts()
  const [workouts, setWorkouts] = useState<WorkoutType[]>(initialWorkouts)

  useEffect(() => {
    setWorkouts(initialWorkouts)
  }, [initialWorkouts])

  return (
    <PageLayout title="Gym Libre" loading={loading} error={error?.message}>
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          name={workout.name}
          date={workout.date}
          href={`/workout/${workout.id}`}
        />
      ))}
    </PageLayout>
  )
}
