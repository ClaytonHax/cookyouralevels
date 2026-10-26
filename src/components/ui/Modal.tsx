import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../../lib/cn'

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

/** Focus trap + Esc + scroll lock + focus restore, shared by Modal and Sheet. */
function useOverlay(open: boolean, onClose: () => void, panel: React.RefObject<HTMLDivElement>) {
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    const root = panel.current
    const focusables = () => Array.from(root?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
    ;(root?.querySelector<HTMLElement>('[data-autofocus]') ?? focusables()[0] ?? root)?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); closeRef.current() }
      if (e.key !== 'Tab') return
      const f = focusables()
      if (!f.length) { e.preventDefault(); return }
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      prev?.focus?.()
    }
  }, [open, panel])
}

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  /** Footer area (buttons). */
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}
const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }

/** Centered dialog. Focus is trapped; Esc and backdrop click close. Add `data-autofocus` to an element to focus it first. */
export function Modal({ open, onClose, title, description, children, footer, size = 'md', className }: ModalProps) {
  const panel = useRef<HTMLDivElement>(null)
  const titleId = useId()
  useOverlay(open, onClose, panel)
  if (!open) return null
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onClose} aria-hidden />
      <div
        ref={panel} role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} tabIndex={-1}
        className={cn('relative w-full bg-surface text-ink border border-border shadow-lift animate-pop-in outline-none max-h-[90dvh] flex flex-col rounded-t-2xl sm:rounded-card', widths[size], className)}
      >
        <div className="flex items-start gap-4 px-6 pt-5 pb-2">
          <div className="flex-1 min-w-0">
            {title && <h2 id={titleId} className="font-display text-xl font-bold">{title}</h2>}
            {description && <p className="text-sm text-ink-2 mt-1">{description}</p>}
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1.5 -mr-2 rounded-control text-ink-3 hover:text-ink hover:bg-surface-2 focus-ring cursor-pointer"><X className="w-5 h-5" /></button>
        </div>
        <div className="px-6 py-3 overflow-y-auto">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-border flex flex-wrap justify-end gap-2">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}

export interface SheetProps {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children: ReactNode
  className?: string
}

/** Bottom sheet (mobile menus, pickers). Same a11y behaviour as Modal. */
export function Sheet({ open, onClose, title, children, className }: SheetProps) {
  const panel = useRef<HTMLDivElement>(null)
  const titleId = useId()
  useOverlay(open, onClose, panel)
  if (!open) return null
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onClose} aria-hidden />
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} tabIndex={-1}
        className={cn('relative w-full max-w-lg bg-surface text-ink border-t border-border rounded-t-2xl shadow-lift animate-sheet-in outline-none max-h-[85dvh] overflow-y-auto pb-[env(safe-area-inset-bottom)]', className)}>
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-border" aria-hidden />
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          {title ? <h2 id={titleId} className="font-display text-lg font-bold">{title}</h2> : <span />}
          <button type="button" onClick={onClose} aria-label="Close" className="p-1.5 -mr-1.5 rounded-control text-ink-3 hover:text-ink hover:bg-surface-2 focus-ring cursor-pointer"><X className="w-5 h-5" /></button>
        </div>
        <div className="px-5 pb-5">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
