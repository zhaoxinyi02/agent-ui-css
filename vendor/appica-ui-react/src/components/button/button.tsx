'use client'

import * as React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils'
import { ButtonGroupContext } from '../button-group/button-group-context'
import { buttonVariants } from './button-variants'

interface ButtonProps extends BaseButton.Props, VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, disabled, ...props }: ButtonProps) {
  const group = React.useContext(ButtonGroupContext)
  const resolvedVariant = variant ?? group?.variant
  const resolvedSize = size ?? group?.size
  const resolvedDisabled = disabled || group?.disabled
  return (
    <BaseButton
      data-slot="button"
      disabled={resolvedDisabled}
      className={cn(buttonVariants({ variant: resolvedVariant, size: resolvedSize }), className)}
      {...props}
    />
  )
}

export { Button }
export type { ButtonProps }
