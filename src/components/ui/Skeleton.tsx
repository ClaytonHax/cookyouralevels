import { cn } from '../../lib/cn'

/** Shimmering placeholder block; size it with className (e.g. "h-6 w-40"). */
export function Skeleton({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn('block relative overflow-hidden rounded-control bg-surface-2 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.4s_infinite] before:bg-gradient-to-r before:from-transparent before:via-ink/5 before:to-transparent', className)} />
  )
}

/** A few text-line skeletons. */
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)} role="status" aria-label="Loading">
      {Array.from({ length: lines }, (_, i) => <Skeleton key={i} className={cn('h-4', i === lines - 1 ? 'w-2/3' : 'w-full')} />)}
    </div>
  )
}

/** Full-page loading placeholder used as the lazy-route fallback. */
export function PageSkeleton() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6" role="status" aria-label="Loading">
      <Skeleton className="h-9 w-64" />
      <Skeleton className="h-4 w-96 max-w-full" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        <Skeleton className="h-36 rounded-card" /><Skeleton className="h-36 rounded-card" /><Skeleton className="h-36 rounded-card" />
      </div>
    </div>
  )
}
