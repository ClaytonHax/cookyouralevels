import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

const clamp = (n: number) => Math.max(0, Math.min(100, Number.isFinite(n) ? n : 0))

export interface ProgressRingProps {
  /** Percent 0-100. */
  value: number
  size?: number
  stroke?: number
  /** Tailwind stroke class for the arc, e.g. 'stroke-maths' (SUBJECTS[i].cls.stroke). Default flame. */
  strokeClass?: string
  /** Centre content; defaults to "NN%". Pass null for none. */
  children?: ReactNode
  label?: string
  className?: string
}

/** Circular progress (SVG). */
export function ProgressRing({ value, size = 64, stroke = 6, strokeClass = 'stroke-flame', children, label, className }: ProgressRingProps) {
  const v = clamp(value)
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className={cn('relative inline-flex items-center justify-center shrink-0', className)} style={{ width: size, height: size }} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(v)} aria-label={label ?? 'Progress'}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-border" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - v / 100)} className={cn(strokeClass, 'transition-[stroke-dashoffset] duration-500 ease-out')} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-ink">{children === undefined ? `${Math.round(v)}%` : children}</span>
    </div>
  )
}

export interface ProgressBarProps {
  /** Percent 0-100. */
  value: number
  /** Tailwind bg class for the fill, e.g. 'bg-maths'. Default flame. */
  colorClass?: string
  height?: 'sm' | 'md'
  label?: string
  className?: string
}

/** Horizontal progress bar. */
export function ProgressBar({ value, colorClass = 'bg-flame', height = 'sm', label, className }: ProgressBarProps) {
  const v = clamp(value)
  return (
    <div className={cn('w-full rounded-full bg-border overflow-hidden', height === 'sm' ? 'h-1.5' : 'h-2.5', className)} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(v)} aria-label={label ?? 'Progress'}>
      <div className={cn('h-full rounded-full transition-[width] duration-500 ease-out', colorClass)} style={{ width: `${v}%` }} />
    </div>
  )
}
