import type { Readiness } from '../../lib/progress'
import { cn } from '../../lib/cn'

/** Segmented red/amber/green/unrated bar for a set of objectives. */
export default function ConfidenceBar({ r, className }: { r: Readiness; className?: string }) {
  const unrated = r.total - r.rated
  const seg = (n: number, cls: string) => (n > 0 ? <span className={cls} style={{ flexGrow: n, flexBasis: 0 }} /> : null)
  return (
    <div
      className={cn('flex h-1.5 w-full gap-px rounded-full overflow-hidden bg-border', className)}
      role="img"
      aria-label={`${r.green} confident, ${r.amber} getting there, ${r.red} not confident, ${unrated} not rated`}
    >
      {seg(r.green, 'bg-conf-green')}
      {seg(r.amber, 'bg-conf-amber')}
      {seg(r.red, 'bg-conf-red')}
      {seg(unrated, 'bg-transparent')}
    </div>
  )
}
