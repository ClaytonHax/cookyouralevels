import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type BadgeTone = 'neutral' | 'flame' | 'maths' | 'physics' | 'cs' | 'red' | 'amber' | 'green'
const tones: Record<BadgeTone, string> = {
  neutral: 'bg-surface-2 text-ink-2',
  flame: 'bg-flame-soft text-flame-strong dark:text-flame',
  maths: 'bg-maths-soft text-maths',
  physics: 'bg-physics-soft text-physics',
  cs: 'bg-cs-soft text-cs',
  red: 'bg-conf-red/10 text-conf-red',
  amber: 'bg-conf-amber/15 text-conf-amber',
  green: 'bg-conf-green/10 text-conf-green',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { tone?: BadgeTone }

/** Small rounded pill label. */
export function Badge({ tone = 'neutral', className, ...rest }: BadgeProps) {
  return <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold leading-5', tones[tone], className)} {...rest} />
}
/** Alias of Badge. */
export const Pill = Badge
