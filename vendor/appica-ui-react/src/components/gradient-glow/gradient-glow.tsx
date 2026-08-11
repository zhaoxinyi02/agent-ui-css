import * as React from 'react'
import { cn } from '../../utils'

type GradientGlowBlur = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
type GradientGlowTrigger = 'hover' | 'press'

interface GradientGlowProps extends React.ComponentProps<'div'> {
  from?: string
  via?: string
  to?: string
  angle?: number
  blur?: GradientGlowBlur
  border?: boolean
  borderWidth?: number
  speed?: number
  revealOn?: GradientGlowTrigger | GradientGlowTrigger[]
  reveal?: boolean
  showOnTouch?: boolean
  pressScale?: boolean
}

const BLUR_CLASS: Record<GradientGlowBlur, string> = {
  sm: 'blur-sm',
  md: 'blur-md',
  lg: 'blur-lg',
  xl: 'blur-xl',
  '2xl': 'blur-2xl',
  '3xl': 'blur-3xl',
}

const BORDER_MASK = 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)'

function GradientGlow({
  from = '#8EC5FF',
  via = '#EFADF7',
  to = '#FFD69B',
  angle = 95,
  blur = 'lg',
  border = false,
  borderWidth = 1,
  speed = 4,
  revealOn,
  reveal,
  showOnTouch = false,
  pressScale = false,
  className,
  style,
  children,
  ...props
}: GradientGlowProps) {
  const gradient = `linear-gradient(calc(${angle}deg + var(--gradient-glow-rotation, 0deg)), ${from} 3.64%, ${via} 53.35%, ${to} 95.37%)`

  const triggers = revealOn == null ? [] : Array.isArray(revealOn) ? revealOn : [revealOn]
  const managed = triggers.length > 0 || reveal !== undefined
  const grouped = managed || pressScale
  const transition =
    managed && pressScale
      ? '[transition:opacity_500ms_ease-out,scale_150ms_ease-out,translate_150ms_ease-out]'
      : managed
        ? 'transition-opacity duration-500 ease-out'
        : pressScale
          ? '[transition:scale_150ms_ease-out,translate_150ms_ease-out]'
          : undefined

  const layerClasses = grouped
    ? cn(
        transition,
        managed && 'opacity-0 [animation-play-state:paused]',
        managed &&
          triggers.includes('hover') &&
          'group-hover/glow:opacity-(--gradient-glow-opacity) group-hover/glow:[animation-play-state:running]',
        managed &&
          triggers.includes('hover') &&
          showOnTouch &&
          'hover-none:opacity-(--gradient-glow-opacity) hover-none:[animation-play-state:running]',
        managed &&
          triggers.includes('press') &&
          'group-active/glow:opacity-(--gradient-glow-opacity) group-active/glow:[animation-play-state:running]',
        managed && reveal && 'opacity-(--gradient-glow-opacity) [animation-play-state:running]',
        pressScale && 'group-active/glow:scale-[0.97] group-active/glow:translate-y-px',
      )
    : undefined

  return (
    <div
      data-slot="gradient-glow"
      data-reveal={managed ? triggers.join(' ') : undefined}
      data-revealed={reveal ? '' : undefined}
      data-show-on-touch={showOnTouch ? '' : undefined}
      className={cn(
        'relative isolate rounded-2xl [--gradient-glow-opacity:1] dark:[--gradient-glow-opacity:0.6]',
        grouped && 'group/glow',
        className,
      )}
      style={{ '--gradient-glow-duration': `${speed}s`, ...style } as React.CSSProperties}
      {...props}
    >
      <span
        aria-hidden
        data-slot="gradient-glow-aura"
        className={cn(
          'motion-safe:animate-gradient-glow-aura pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-(--gradient-glow-opacity)',
          BLUR_CLASS[blur],
          layerClasses,
        )}
        style={{ background: gradient }}
      />
      {children}
      {border ? (
        <span
          aria-hidden
          data-slot="gradient-glow-border"
          className={cn(
            'motion-safe:animate-gradient-glow pointer-events-none absolute inset-0 rounded-[inherit] opacity-(--gradient-glow-opacity)',
            layerClasses,
          )}
          style={{
            background: gradient,
            padding: borderWidth,
            WebkitMask: BORDER_MASK,
            WebkitMaskComposite: 'xor',
            mask: BORDER_MASK,
            maskComposite: 'exclude',
          }}
        />
      ) : null}
    </div>
  )
}

export { GradientGlow }
export type { GradientGlowProps }
