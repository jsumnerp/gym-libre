import { useState, useEffect } from 'react'
import { openDB } from 'idb'
import { type Workout, type GymLibreDB } from '@/types/db'

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadWorkouts() {
      try {
        const db = await openDB<GymLibreDB>('gym-libre-db', 1)
        const allWorkouts = (
          await db.getAllFromIndex('workouts', 'by-date')
        ).reverse()

        if (mounted) {
          setWorkouts(allWorkouts)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error ? err : new Error('Failed to load workouts'),
          )
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadWorkouts()

    return () => {
      mounted = false
    }
  }, [])

  return { workouts, loading, error }
}
