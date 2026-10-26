export function Skeleton({ className = '' }) {
  return <div className={`skeleton rounded-xl ${className}`} aria-hidden="true" />
}

export function PageSkeleton({ label = 'Loading…' }) {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">{label}</span>
      <Skeleton className="h-40 rounded-card mb-6" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-24 rounded-card" />)}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {[0, 1].map((i) => <Skeleton key={i} className="h-44 rounded-card" />)}
      </div>
    </div>
  )
}
