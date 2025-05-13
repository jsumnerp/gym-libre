import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SetInput } from './SetInput'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type Set } from '@/types/db'

type EditableExerciseCardProps = {
  exerciseName: string
  sets: Set[]
  readonly: false
  onRepsChange: (index: number, value: number) => void
  onKgChange: (index: number, value: number) => void
}

type ReadonlyExerciseCardProps = {
  exerciseName: string
  sets: Set[]
  readonly: true
}

type ExerciseCardProps = EditableExerciseCardProps | ReadonlyExerciseCardProps

export const ExerciseCard = ({
  exerciseName,
  sets,
  readonly,
  ...props
}: ExerciseCardProps) => {
  const handleRepsChange = !readonly
    ? (index: number, value: string) => {
        ;(props as EditableExerciseCardProps).onRepsChange(
          index,
          Number.parseInt(value) || 0,
        )
      }
    : undefined

  const handleKgChange = !readonly
    ? (index: number, value: string) => {
        ;(props as EditableExerciseCardProps).onKgChange(
          index,
          Number.parseFloat(value) || 0,
        )
      }
    : undefined

  return (
    <Card className="w-full max-w-md gap-2 rounded-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          <h2>{exerciseName}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Set</TableHead>
              <TableHead>kg</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Reps</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sets.map((set, index) => (
              <TableRow key={set.set}>
                <TableCell data-testid={`set-number-${set.set}`}>
                  {set.set}
                </TableCell>
                <TableCell>
                  {readonly ? (
                    <span data-testid={`kg-${set.set}`}>{set.kg}</span>
                  ) : (
                    <SetInput
                      id={`kg-input-${set.set}`}
                      value={set.kg}
                      onChange={(value) =>
                        handleKgChange && handleKgChange(index, value)
                      }
                      ariaLabel={`Weight in kilograms for set ${set.set}`}
                      min="0"
                    />
                  )}
                </TableCell>
                <TableCell data-testid={`target-reps-${set.set}`}>
                  {set.target} reps
                </TableCell>
                <TableCell>
                  {readonly ? (
                    <span data-testid={`reps-${set.set}`}>{set.reps}</span>
                  ) : (
                    <SetInput
                      id={`reps-input-${set.set}`}
                      value={set.reps}
                      onChange={(value) =>
                        handleRepsChange && handleRepsChange(index, value)
                      }
                      ariaLabel={`Number of repetitions for set ${set.set}`}
                      min="0"
                      step="1"
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
