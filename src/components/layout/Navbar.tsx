import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../hooks/useTheme'
import { Button, buttonClasses } from '../ui'

export function BrandMark({ small }: { small?: boolean }) {
  return (
    <span className={`${small ? 'w-8 h-8 text-base' : 'w-9 h-9 text-lg'} rounded-[11px] bg-flame-strong flex items-center justify-center shadow-soft shrink-0`} aria-hidden>🔥</span>
  )
}

const links = [
  ['Features', '#features'],
  ['Subjects', '#subjects'],
  ['How it works', '#how'],
  ['FAQ', '#faq'],
]

export default function Navbar() {
  const { user, openAuth } = useAuth()
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2.5 focus-ring rounded-control">
          <BrandMark small />
          <span className="font-display font-extrabold text-[16px] sm:text-[17px] tracking-tight text-ink whitespace-nowrap">
            Cook Your <span className="text-flame-strong dark:text-flame">A Levels</span>
          </span>
        </Link>

        <nav aria-label="Sections" className="hidden md:flex items-center gap-1 ml-6">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="px-3 py-2 rounded-control text-sm font-bold text-ink-2 hover:text-ink hover:bg-surface-2 transition-colors focus-ring">
              {label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-10 h-10 rounded-control flex items-center justify-center text-ink-2 hover:bg-surface-2 hover:text-ink transition-colors focus-ring cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
          {user ? (
            <Link to="/dashboard" className={buttonClasses('primary', 'md')}>Open dashboard</Link>
          ) : (
            <>
              <Button variant="ghost" onClick={openAuth}>Sign in</Button>
              <Button className="hidden sm:inline-flex" onClick={openAuth}>Start free</Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
