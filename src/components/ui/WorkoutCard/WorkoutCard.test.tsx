import { describe, it, expect, beforeEach, vi } from 'vitest'
import { WorkoutCard } from './index'
import { formatWorkoutDate } from '@/lib/formatDate'
import { render, screen } from '@/test/test-utils'

vi.mock('@/lib/formatDate')

describe('WorkoutCard', () => {
  const mockProps = {
    name: 'Test Workout',
    date: '2024-03-20T10:00:00Z',
    href: '/workouts/123',
  }

  beforeEach(() => {
    vi.mocked(formatWorkoutDate).mockReturnValue('March 20, 2024')
  })

  it('renders the workout name and formatted date', () => {
    render(<WorkoutCard {...mockProps} />)

    expect(screen.getByText('Test Workout')).toBeInTheDocument()
    expect(screen.getByText('March 20, 2024')).toBeInTheDocument()
  })

  it('renders a link with the correct href', () => {
    render(<WorkoutCard {...mockProps} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/workouts/123')
  })

  it('has the correct aria-label for accessibility', () => {
    render(<WorkoutCard {...mockProps} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute(
      'aria-label',
      'View details for workout: Test Workout from March 20, 2024',
    )
  })

  it('renders the chevron icon as decorative', () => {
    render(<WorkoutCard {...mockProps} />)

    const chevron = screen.getByTestId('chevron-right')
    expect(chevron).toHaveAttribute('aria-hidden', 'true')
  })

  it('calls formatWorkoutDate with the correct date', () => {
    render(<WorkoutCard {...mockProps} />)

    expect(formatWorkoutDate).toHaveBeenCalledWith('2024-03-20T10:00:00Z')
  })
})
