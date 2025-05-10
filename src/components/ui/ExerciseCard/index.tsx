import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Set {
  set: number
  kg: number
  target: number
  reps: number
}

interface ExerciseCardProps {
  exerciseName: string
  sets: Set[]
  onRepsChange: (index: number, value: number) => void
  onKgChange: (index: number, value: number) => void
}

export const ExerciseCard = ({
  exerciseName,
  sets,
  onRepsChange,
  onKgChange,
}: ExerciseCardProps) => {
  const handleRepsChange = (index: number, value: string) => {
    onRepsChange(index, Number.parseInt(value) || 0)
  }

  const handleKgChange = (index: number, value: string) => {
    onKgChange(index, Number.parseFloat(value) || 0)
  }

  return (
    <Card className="w-full max-w-md gap-2 rounded-sm p-4">
      <h2 className="text-xl font-semibold">{exerciseName}</h2>
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
              <TableCell
                className="font-medium"
                data-testid={`set-number-${set.set}`}
              >
                {set.set}
              </TableCell>
              <TableCell>
                <label htmlFor={`kg-input-${set.set}`} className="sr-only">
                  Weight in kilograms for set {set.set}
                </label>
                <Input
                  id={`kg-input-${set.set}`}
                  type="number"
                  value={set.kg}
                  onChange={(e) => handleKgChange(index, e.target.value)}
                  className="w-full rounded-sm border border-gray-300"
                  aria-label={`Weight in kilograms for set ${set.set}`}
                  min="0"
                  data-testid={`kg-input-${set.set}`}
                />
              </TableCell>
              <TableCell data-testid={`target-reps-${set.set}`}>
                {set.target} reps
              </TableCell>
              <TableCell>
                <label htmlFor={`reps-input-${set.set}`} className="sr-only">
                  Number of repetitions for set {set.set}
                </label>
                <Input
                  id={`reps-input-${set.set}`}
                  type="number"
                  value={set.reps}
                  onChange={(e) => handleRepsChange(index, e.target.value)}
                  className="w-full rounded-sm border-2 border-gray-300"
                  aria-label={`Number of repetitions for set ${set.set}`}
                  min="0"
                  step="1"
                  data-testid={`reps-input-${set.set}`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
