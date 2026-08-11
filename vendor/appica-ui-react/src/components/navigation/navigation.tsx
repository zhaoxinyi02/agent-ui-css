'use client'

import * as React from 'react'
import { cn } from '../../utils'
import {
  NavigationContext,
  useNavigationContext,
  type NavigationSize,
  type NavigationVariant,
  type NavigationActiveLink,
  type NavigationContextValue,
} from './navigation-context'

type NavigationBaseProps = Omit<React.ComponentPropsWithoutRef<'nav'>, 'aria-orientation'> & {
  size?: NavigationSize
  activeLink?: NavigationActiveLink
}

type NavigationProps = NavigationBaseProps &
  (
    | { orientation?: 'horizontal'; variant?: Extract<NavigationVariant, 'pill' | 'line'> }
    | { orientation: 'vertical'; variant?: Extract<NavigationVariant, 'pill' | 'line' | 'indicator'> }
  )

function Navigation({
  className,
  orientation = 'horizontal',
  variant = 'pill',
  size = 'md',
  activeLink = null,
  ...props
}: NavigationProps) {
  const ctx = React.useMemo<NavigationContextValue>(
    () => ({ orientation, variant: variant as NavigationVariant, size, activeLink }),
    [orientation, variant, size, activeLink],
  )

  return (
    <NavigationContext.Provider value={ctx}>
      <nav data-slot="navigation" data-orientation={orientation} className={className} {...props} />
    </NavigationContext.Provider>
  )
}

type NavigationListProps = React.ComponentPropsWithoutRef<'ul'>

const HORIZONTAL_GAP: Partial<Record<NavigationVariant, string>> = {
  pill: 'gap-0.5',
  line: 'gap-7',
}

const VERTICAL_GAP: Partial<Record<NavigationVariant, string>> = {
  pill: 'gap-0.5',
}

function NavigationList({ className, ...props }: NavigationListProps) {
  const ctx = useNavigationContext()
  const orientation = ctx?.orientation ?? 'horizontal'
  const variant = ctx?.variant ?? 'pill'

  const gap = (orientation === 'vertical' ? VERTICAL_GAP : HORIZONTAL_GAP)[variant]
  const layout = cn('flex', orientation === 'vertical' && 'flex-col', gap)

  return <ul data-slot="navigation-list" role="list" className={cn(layout, className)} {...props} />
}

type NavigationItemProps = React.ComponentPropsWithoutRef<'li'>

function NavigationItem({ className, ...props }: NavigationItemProps) {
  return <li data-slot="navigation-item" className={className} {...props} />
}

export { Navigation, NavigationList, NavigationItem }
export type { NavigationProps, NavigationListProps, NavigationItemProps }
