export default function ProgressBar({ value, label, reached = false, size = 'md' }) {
  const pct = Math.round((value || 0) * 100)
  return (
    <div
      className={`${size === 'sm' ? 'h-2' : 'h-3'} rounded-full shadow-inset bg-surface overflow-hidden`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || 'Progress'}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-700 ease-out ${
          reached ? 'bg-gradient-to-r from-emerald-400 to-green-600' : 'bg-gradient-to-r from-primary to-primary-strong'
        }`}
        style={{ width: `${Math.max(pct, pct > 0 ? 6 : 0)}%` }}
      />
    </div>
  )
}
