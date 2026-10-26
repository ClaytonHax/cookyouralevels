import { cn } from '../../lib/cn'

export type ConfidenceValue = 1 | 2 | 3 | null
export interface ConfidencePickerProps {
  value: ConfidenceValue
  /** Called with the new level, or null when the selected dot is clicked again (clears). */
  onChange: (v: ConfidenceValue) => void
  /** What is being rated, for screen readers (e.g. the objective text). */
  label?: string
  size?: 'sm' | 'md'
  className?: string
}
const LEVELS = [
  { v: 1 as const, name: 'Not confident', on: 'bg-conf-red border-conf-red', off: 'border-conf-red/50 hover:bg-conf-red/15' },
  { v: 2 as const, name: 'Getting there', on: 'bg-conf-amber border-conf-amber', off: 'border-conf-amber/50 hover:bg-conf-amber/15' },
  { v: 3 as const, name: 'Confident', on: 'bg-conf-green border-conf-green', off: 'border-conf-green/50 hover:bg-conf-green/15' },
]

/** Three-dot red/amber/green rating (radio group). Click the active dot again to clear. */
export function ConfidencePicker({ value, onChange, label, size = 'md', className }: ConfidencePickerProps) {
  return (
    <div role="radiogroup" aria-label={label ? `Confidence: ${label}` : 'Confidence'} className={cn('inline-flex items-center gap-1.5', className)}>
      {LEVELS.map((l) => {
        const active = value === l.v
        return (
          <button
            key={l.v} type="button" role="radio" aria-checked={active} aria-label={l.name} title={l.name}
            onClick={() => onChange(active ? null : l.v)}
            className={cn('rounded-full border-2 transition-all duration-150 focus-ring cursor-pointer', size === 'sm' ? 'w-4 h-4' : 'w-5 h-5', active ? l.on : l.off, active && 'scale-110')}
          />
        )
      })}
    </div>
  )
}
