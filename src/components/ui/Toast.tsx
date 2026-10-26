import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import { cn } from '../../lib/cn'

export type ToastKind = 'info' | 'success' | 'error'
interface ToastItem { id: number; kind: ToastKind; message: ReactNode }
export interface ToastApi {
  /** Show a toast. Auto-dismisses after `duration` ms (default 3500; errors 6000). */
  toast: (message: ReactNode, opts?: { kind?: ToastKind; duration?: number }) => void
  success: (message: ReactNode) => void
  error: (message: ReactNode) => void
}
const Ctx = createContext<ToastApi | null>(null)
const icons = { info: Info, success: CheckCircle2, error: AlertCircle }
const tone = { info: 'text-ink-2', success: 'text-conf-green', error: 'text-conf-red' }

/** Mount once (done in App). */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const next = useRef(1)
  const dismiss = useCallback((id: number) => setItems((l) => l.filter((t) => t.id !== id)), [])
  const toast = useCallback<ToastApi['toast']>((message, opts) => {
    const id = next.current++
    const kind = opts?.kind ?? 'info'
    setItems((l) => [...l.slice(-3), { id, kind, message }])
    setTimeout(() => dismiss(id), opts?.duration ?? (kind === 'error' ? 6000 : 3500))
  }, [dismiss])
  const api = useMemo<ToastApi>(() => ({
    toast,
    success: (m) => toast(m, { kind: 'success' }),
    error: (m) => toast(m, { kind: 'error' }),
  }), [toast])
  return (
    <Ctx.Provider value={api}>
      {children}
      <div className="fixed z-[200] bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm flex flex-col gap-2 pointer-events-none" role="region" aria-label="Notifications" aria-live="polite">
        {items.map((t) => {
          const Icon = icons[t.kind]
          return (
            <div key={t.id} role={t.kind === 'error' ? 'alert' : 'status'} className="pointer-events-auto flex items-start gap-3 bg-surface text-ink border border-border rounded-control shadow-lift px-4 py-3 text-sm animate-pop-in">
              <Icon className={cn('w-5 h-5 shrink-0 mt-px', tone[t.kind])} aria-hidden />
              <div className="flex-1">{t.message}</div>
              <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss" className="text-ink-3 hover:text-ink focus-ring rounded cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
          )
        })}
      </div>
    </Ctx.Provider>
  )
}

/** `const { toast, success, error } = useToast()` */
export function useToast(): ToastApi {
  const c = useContext(Ctx)
  if (!c) throw new Error('useToast must be used within ToastProvider')
  return c
}
