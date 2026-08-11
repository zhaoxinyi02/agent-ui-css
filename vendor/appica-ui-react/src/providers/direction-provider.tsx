import type { ReactNode } from 'react'
import { DirectionProvider as BaseDirectionProvider } from '@base-ui/react/direction-provider'

export type Direction = 'ltr' | 'rtl'

export interface DirectionProviderProps {
  children: ReactNode
  /**
   * Reading direction for components with bidirectional layout (Switch, Slider,
   * Carousel, etc.). Matches the HTML `dir` attribute; descendants read it via
   * our `useDirection()` hook. Defaults to `ltr`.
   */
  dir?: Direction
}

/**
 * Sets the reading direction for descendant components. Thin wrapper over Base
 * UI's direction provider so consumers depend on `@appica/ui-react` rather than
 * the underlying primitive.
 *
 * Optional — components default to `ltr` with no provider, so reach for this
 * only when supporting RTL.
 */
export function DirectionProvider({ children, dir = 'ltr' }: DirectionProviderProps) {
  return <BaseDirectionProvider direction={dir}>{children}</BaseDirectionProvider>
}
