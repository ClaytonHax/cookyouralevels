import { GRADE_COLORS, GRADE_TEXT } from '../../lib/grades'
import { cn } from '../../lib/cn'

/** Round badge in the Cambridge grade colour. */
export default function GradeCoin({ grade, size = 'md', className }: { grade: string | null; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const dim = size === 'lg' ? 'w-20 h-20 text-3xl' : size === 'sm' ? 'w-8 h-8 text-xs' : 'w-11 h-11 text-base'
  if (!grade) return <span className={cn('rounded-full grid place-items-center border-2 border-dashed border-border text-ink-3 font-display font-extrabold', dim, className)} aria-label="No grade yet">?</span>
  return (
    <span className={cn('rounded-full grid place-items-center font-display font-extrabold shadow-soft ring-2 ring-white/40', dim, className)}
      style={{ background: GRADE_COLORS[grade], color: GRADE_TEXT[grade] }} role="img" aria-label={`Grade ${grade}`}>
      {grade}
    </span>
  )
}
