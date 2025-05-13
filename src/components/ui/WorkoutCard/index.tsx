import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { formatWorkoutDate } from '@/lib/formatDate'
import { Link } from 'react-router-dom'

interface WorkoutCardProps {
  name: string
  date: string // ISO string
  href: string
}

export function WorkoutCard({ name, date, href }: WorkoutCardProps) {
  const formattedDate = formatWorkoutDate(date)

  return (
    <Link
      to={href}
      aria-label={`View details for workout: ${name} from ${formattedDate}`}
      className="w-full max-w-md"
    >
      <Card className="rounded-sm">
        <CardContent className="flex flex-row items-center justify-between">
          <div>
            <h2 className="mb-2 text-xl font-semibold">{name}</h2>
            <p className="text-sm">{formattedDate}</p>
          </div>
          <span aria-hidden="true">
            <ChevronRight strokeWidth={2} data-testid="chevron-right" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
