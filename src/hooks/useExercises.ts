import { useState, useEffect } from 'react'
import { openDB } from 'idb'
import { type Exercise, type GymLibreDB } from '@/types/db'

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadExercises() {
      try {
        const db = await openDB<GymLibreDB>('gym-libre-db', 1)
        const tx = db.transaction('exercises', 'readonly')
        const store = tx.objectStore('exercises')
        const allExercises = await store.getAll()

        if (mounted) {
          setExercises(allExercises)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error ? err : new Error('Failed to load exercises'),
          )
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadExercises()

    return () => {
      mounted = false
    }
  }, [])

  return { exercises, loading, error }
}
