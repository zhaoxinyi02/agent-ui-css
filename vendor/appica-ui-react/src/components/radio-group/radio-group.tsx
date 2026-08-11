import * as React from 'react'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { cn } from '../../utils'

interface RadioGroupProps extends React.ComponentProps<typeof BaseRadioGroup> {
  orientation?: 'horizontal' | 'vertical'
}

function RadioGroup({ className, orientation = 'vertical', ...props }: RadioGroupProps) {
  const horizontal = orientation === 'horizontal'
  return (
    <BaseRadioGroup
      data-slot="radio-group"
      aria-orientation={orientation}
      className={cn('flex', horizontal ? 'flex-wrap gap-4' : 'flex-col gap-2', className)}
      {...props}
    />
  )
}

export { RadioGroup }
export type { RadioGroupProps }
