import { useRef } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface TabItem { id: string; label: ReactNode; icon?: ReactNode; count?: number }
export interface TabsProps {
  items: TabItem[]
  value: string
  onChange: (id: string) => void
  /** Used to wire aria-controls; pair with <TabPanel idPrefix=…>. */
  idPrefix?: string
  /** Accessible name of the tablist. */
  label?: string
  className?: string
}

/** Accessible tablist (roving tabindex, arrow/Home/End keys). Render content with <TabPanel>. */
export function Tabs({ items, value, onChange, idPrefix = 'tabs', label, className }: TabsProps) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const onKey = (e: KeyboardEvent) => {
    const i = items.findIndex((t) => t.id === value)
    let n = -1
    if (e.key === 'ArrowRight') n = (i + 1) % items.length
    else if (e.key === 'ArrowLeft') n = (i - 1 + items.length) % items.length
    else if (e.key === 'Home') n = 0
    else if (e.key === 'End') n = items.length - 1
    if (n >= 0) { e.preventDefault(); onChange(items[n].id); refs.current[items[n].id]?.focus() }
  }
  return (
    <div role="tablist" aria-label={label} onKeyDown={onKey} className={cn('flex gap-1 overflow-x-auto scrollbar-thin border-b border-border', className)}>
      {items.map((t) => {
        const active = t.id === value
        return (
          <button
            key={t.id}
            ref={(el) => { refs.current[t.id] = el }}
            role="tab"
            id={`${idPrefix}-tab-${t.id}`}
            aria-selected={active}
            aria-controls={`${idPrefix}-panel-${t.id}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(t.id)}
            className={cn(
              'relative inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-bold whitespace-nowrap focus-ring rounded-t-control transition-colors cursor-pointer',
              active ? 'text-ink' : 'text-ink-3 hover:text-ink-2',
            )}
          >
            {t.icon}
            {t.label}
            {t.count !== undefined && <span className="text-xs font-bold bg-surface-2 text-ink-2 rounded-full px-1.5 py-px">{t.count}</span>}
            <span className={cn('absolute left-2 right-2 -bottom-px h-0.5 rounded-full bg-flame transition-opacity', active ? 'opacity-100' : 'opacity-0')} />
          </button>
        )
      })}
    </div>
  )
}

/** Panel for a tab; only renders children when active. */
export function TabPanel({ idPrefix = 'tabs', id, value, children, className }: { idPrefix?: string; id: string; value: string; children: ReactNode; className?: string }) {
  if (id !== value) return null
  return <div role="tabpanel" id={`${idPrefix}-panel-${id}`} aria-labelledby={`${idPrefix}-tab-${id}`} tabIndex={0} className={cn('focus-ring', className)}>{children}</div>
}
