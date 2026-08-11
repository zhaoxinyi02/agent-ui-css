import * as React from 'react'
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import { cn } from '../../utils'

interface CheckboxGroupProps extends React.ComponentProps<typeof BaseCheckboxGroup> {
  orientation?: 'horizontal' | 'vertical'
}

function CheckboxGroup({ className, orientation = 'vertical', ...props }: CheckboxGroupProps) {
  const horizontal = orientation === 'horizontal'
  return (
    <BaseCheckboxGroup
      data-slot="checkbox-group"
      className={cn('flex', horizontal ? 'flex-wrap gap-4' : 'flex-col gap-2', className)}
      {...props}
    />
  )
}

export { CheckboxGroup }
export type { CheckboxGroupProps }
