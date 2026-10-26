import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Inner padding. Default 'md' (p-5). */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Adds hover lift (for clickable cards; wrap content in a Link). */
  interactive?: boolean
}
const pad = { none: '', sm: 'p-3', md: 'p-5', lg: 'p-7' }

/** Surface container: bg-surface, border, 14px radius, soft shadow. */
export function Card({ padding = 'md', interactive, className, ...rest }: CardProps) {
  return (
    <div
      className={cn('card', pad[padding], interactive && 'transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift hover:border-ink-3/40', className)}
      {...rest}
    />
  )
}
