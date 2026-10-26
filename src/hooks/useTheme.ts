import { useSyncExternalStore } from 'react'
import { getTheme, onThemeChange, toggleTheme, setTheme } from '../lib/theme'
import type { Theme } from '../lib/theme'

/** Reactive theme: `{ theme, toggle, setTheme }`. */
export function useTheme(): { theme: Theme; toggle: () => Theme; setTheme: (t: Theme) => void } {
  const theme = useSyncExternalStore(onThemeChange, getTheme, () => 'light' as Theme)
  return { theme, toggle: toggleTheme, setTheme }
}
