// Theme helper: follows the system by default; an explicit choice is persisted in localStorage.
export type Theme = 'light' | 'dark'
const KEY = 'cyal.theme'

/** Currently applied theme (reads the <html> class). */
export function getTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function stored(): Theme | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

/** Apply a theme to <html> (does not persist). */
export function applyTheme(t: Theme): void {
  document.documentElement.classList.toggle('dark', t === 'dark')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'dark' ? '#0F0E14' : '#FBFAF7')
}

/** Apply and persist an explicit theme choice. */
export function setTheme(t: Theme): void {
  applyTheme(t)
  try { localStorage.setItem(KEY, t) } catch { /* ignore */ }
  window.dispatchEvent(new Event('cyal-theme'))
}

/** Flip light/dark and persist. Returns the new theme. */
export function toggleTheme(): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
  setTheme(next)
  return next
}

/** Call once at startup: applies stored theme or system preference, and tracks system changes until the user chooses. */
export function initTheme(): void {
  const sys = window.matchMedia?.('(prefers-color-scheme: dark)')
  applyTheme(stored() ?? (sys?.matches ? 'dark' : 'light'))
  sys?.addEventListener?.('change', (e) => {
    if (!stored()) {
      applyTheme(e.matches ? 'dark' : 'light')
      window.dispatchEvent(new Event('cyal-theme'))
    }
  })
}

/** Subscribe to theme changes (for useTheme). */
export function onThemeChange(cb: () => void): () => void {
  window.addEventListener('cyal-theme', cb)
  return () => window.removeEventListener('cyal-theme', cb)
}
