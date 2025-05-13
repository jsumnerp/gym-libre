import { Input } from '@/components/ui/input'
import React from 'react'

interface SetInputProps {
  id: string
  value: number
  onChange: (value: string) => void
  ariaLabel: string
  min?: string | number
  step?: string | number
}

export const SetInput: React.FC<SetInputProps> = ({
  id,
  value,
  onChange,
  ariaLabel,
  min = '0',
  step,
}) => (
  <>
    <label htmlFor={id} className="sr-only">
      {ariaLabel}
    </label>
    <Input
      id={id}
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-sm border border-gray-300"
      aria-label={ariaLabel}
      min={min}
      step={step}
      data-testid={id}
    />
  </>
)
