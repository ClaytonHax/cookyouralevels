import { createContext, useCallback, useContext, useState } from 'react'
import Icon from './Icon'

const ToastContext = createContext(() => {})

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message, tone = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, tone }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        className="fixed z-50 bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 flex flex-col gap-2 items-stretch sm:items-end pointer-events-none"
        aria-live="polite"
        role="status"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto animate-fade-up flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold shadow-lift ${
              t.tone === 'error' ? 'bg-red-700 text-white' : 'bg-ink text-white'
            }`}
          >
            <span className={`grid place-items-center w-7 h-7 rounded-full ${t.tone === 'error' ? 'bg-white/20' : 'bg-primary'}`}>
              <Icon name={t.tone === 'error' ? 'info' : 'check'} size={16} strokeWidth={3} />
            </span>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
