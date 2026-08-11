'use client'

import { createContext, use, useEffect, useMemo, type ReactNode } from 'react'

export interface ReducedMotionContextValue {
  disableAnimations: boolean
}

const DEFAULT_CONTEXT: ReducedMotionContextValue = {
  disableAnimations: false,
}

const ReducedMotionContext = createContext<ReducedMotionContextValue>(DEFAULT_CONTEXT)

export interface ReducedMotionProviderProps {
  children: ReactNode
  /**
   * Force-disable all component animations regardless of OS `prefers-reduced-motion`.
   * Components also respect the OS preference automatically — this is the global override.
   *
   * The attribute is set on `<html>` (not on a wrapper div) so it reaches Base UI's portaled
   * popups, which render under `document.body` and therefore escape the React subtree. The
   * `motion-reduce:` / `motion-safe:` custom variants in styles.css already target
   * `[data-disable-animations] *`.
   */
  disableAnimations?: boolean
}

const ATTR = 'data-disable-animations'

/**
 * Opts a subtree out of animation. The JS channel (`useReducedMotion()`) is
 * scoped to this provider's React subtree; the CSS channel (the
 * `motion-reduce:` variant) is driven by a `data-disable-animations` attribute
 * written to `<html>`, so it applies page-wide while mounted and covers
 * portaled popups.
 *
 * Optional — components already respect the OS `prefers-reduced-motion`
 * preference with no provider. Reach for this only to force-disable animations.
 */
export function ReducedMotionProvider({ children, disableAnimations = false }: ReducedMotionProviderProps) {
  useEffect(() => {
    if (!disableAnimations) return
    const html = document.documentElement
    html.setAttribute(ATTR, '')
    return () => {
      html.removeAttribute(ATTR)
    }
  }, [disableAnimations])

  const value = useMemo<ReducedMotionContextValue>(() => ({ disableAnimations }), [disableAnimations])

  return <ReducedMotionContext value={value}>{children}</ReducedMotionContext>
}

export function useReducedMotionContext(): ReducedMotionContextValue {
  return use(ReducedMotionContext)
}
