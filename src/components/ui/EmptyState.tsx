import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface EmptyStateProps {
  icon?: ReactNode
  title: ReactNode
  /** Always say what to do next. */
  description?: ReactNode
  action?: ReactNode
  className?: string
}

/** Friendly empty/zero/error state: icon, title, hint and an action. */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center text-center py-12 px-6 border border-dashed border-border rounded-card bg-surface/50', className)}>
      {icon && <div className="w-12 h-12 rounded-full bg-flame-soft text-flame flex items-center justify-center mb-4 [&>svg]:w-6 [&>svg]:h-6">{icon}</div>}
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      {description && <p className="text-sm text-ink-2 mt-1.5 max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
