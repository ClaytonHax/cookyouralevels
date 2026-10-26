import { Bookmark, CheckCircle2, CircleDot, RotateCcw } from 'lucide-react'
import { Badge } from '../ui'
import type { BadgeTone } from '../ui'
import { cn } from '../../lib/cn'
import type { Level } from '../../types/content'

export type QStatus = 'tried' | 'done' | 'review'

export const STATUS_META: Record<QStatus, { label: string; tone: BadgeTone; icon: typeof CheckCircle2 }> = {
  done: { label: 'Done', tone: 'green', icon: CheckCircle2 },
  review: { label: 'Needs review', tone: 'amber', icon: RotateCcw },
  tried: { label: 'Tried', tone: 'neutral', icon: CircleDot },
}

export function StatusPill({ status }: { status?: QStatus }) {
  if (!status) return null
  const m = STATUS_META[status]
  const Icon = m.icon
  return <Badge tone={m.tone}><Icon className="w-3 h-3" aria-hidden />{m.label}</Badge>
}

export function LevelBadge({ level }: { level: Level }) {
  return <Badge tone={level === 'A2' ? 'flame' : 'neutral'}>{level}</Badge>
}

export function BookmarkButton({ on, onToggle, className, label }: { on: boolean; onToggle: () => void; className?: string; label?: string }) {
  return (
    <button
      type="button" onClick={onToggle} aria-pressed={on} aria-label={on ? 'Remove bookmark' : 'Bookmark question'}
      className={cn('inline-flex items-center justify-center gap-1.5 h-10 min-w-10 rounded-control text-ink-3 hover:text-flame hover:bg-surface-2 focus-ring cursor-pointer transition-colors', on && 'text-flame', className)}
    >
      <Bookmark className={cn('w-5 h-5', on && 'fill-current')} aria-hidden />
      {label && <span className="text-sm font-semibold">{label}</span>}
    </button>
  )
}

/** Images are white-background scans: keep them on a white card in dark mode. */
export function ScanImage({ src, alt, onClick, className }: { src: string; alt: string; onClick?: () => void; className?: string }) {
  const img = <img src={src} alt={alt} loading="lazy" decoding="async" className="block w-full h-auto" />
  return (
    <div className={cn('bg-white rounded-control overflow-hidden ring-1 ring-black/5', className)}>
      {onClick ? (
        <button type="button" onClick={onClick} className="block w-full cursor-zoom-in focus-ring" aria-label={`${alt} - open full size`}>{img}</button>
      ) : img}
    </div>
  )
}
