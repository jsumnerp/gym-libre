import { useState, useEffect } from 'react'
import { ExerciseCard } from '@/components/ui/ExerciseCard'
import { ThemeProvider } from '@/components/ThemeProvider'
import { useExercises } from '@/hooks/useExercises'
import { type Exercise } from '@/types/db'

function App() {
  const { exercises: initialExercises, loading, error } = useExercises()
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises)

  // Update local state when initialExercises changes
  useEffect(() => {
    setExercises(initialExercises)
  }, [initialExercises])

  if (loading) {
    return (
      <ThemeProvider storageKey="vite-ui-theme">
        <div className="flex min-h-svh items-center justify-center">
          <div className="text-lg">Loading exercises...</div>
        </div>
      </ThemeProvider>
    )
  }

  if (error) {
    return (
      <ThemeProvider storageKey="vite-ui-theme">
        <div className="flex min-h-svh items-center justify-center">
          <div className="text-lg text-red-500">Error: {error.message}</div>
        </div>
      </ThemeProvider>
    )
  }

  const handleRepsChange = (
    setIndex: number,
    value: number,
    exerciseId?: number,
  ) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.map((set, idx) =>
              idx === setIndex ? { ...set, reps: value } : set,
            ),
          }
        }
        return exercise
      }),
    )
  }

  const handleKgChange = (
    setIndex: number,
    value: number,
    exerciseId?: number,
  ) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.map((set, idx) =>
              idx === setIndex ? { ...set, kg: value } : set,
            ),
          }
        }
        return exercise
      }),
    )
  }

  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <div className="flex min-h-svh flex-col items-center justify-center p-4">
        <h1 className="mb-8 text-2xl font-bold">Gym Libre</h1>
        <div className="flex w-full max-w-2xl flex-col items-center gap-6">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exerciseName={exercise.name}
              sets={exercise.sets}
              onRepsChange={(index, value) =>
                handleRepsChange(index, value, exercise.id)
              }
              onKgChange={(index, value) =>
                handleKgChange(index, value, exercise.id)
              }
            />
          ))}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
