import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, GraduationCap, Home, LogOut, Moon, NotebookPen, Settings, Sparkles, Sun, UserRound } from 'lucide-react'
import type { ComponentType } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useProfile } from '../../hooks/useUserData'
import { useTheme } from '../../hooks/useTheme'
import { onStoreError } from '../../lib/userStore'
import { SUBJECTS } from '../../lib/subjects'
import { cn } from '../../lib/cn'
import { Badge, Button, Sheet, useToast } from '../ui'

type Icon = ComponentType<{ className?: string }>

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/dashboard" className={cn('flex items-center gap-2.5 focus-ring rounded-control', className)}>
      <span className="w-9 h-9 rounded-[11px] bg-flame-strong flex items-center justify-center text-lg shadow-soft" aria-hidden>🔥</span>
      <span className="font-display font-extrabold text-[17px] leading-tight text-ink tracking-tight">Cook Your<br />A Levels</span>
    </Link>
  )
}

const linkBase = 'flex items-center gap-3 px-3 py-2 rounded-control text-sm font-bold transition-colors focus-ring'
const linkIdle = 'text-ink-2 hover:bg-surface-2 hover:text-ink'
const linkActive = 'bg-flame-soft text-flame-strong dark:text-flame'

function NavItem({ to, icon: I, children, end, soon }: { to: string; icon: Icon; children: string; end?: boolean; soon?: boolean }) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => cn(linkBase, isActive ? linkActive : linkIdle)}>
      <I className="w-[18px] h-[18px] shrink-0" />
      <span className="flex-1">{children}</span>
      {soon && <Badge tone="flame">Soon</Badge>}
    </NavLink>
  )
}

function useMySubjects() {
  const { profile } = useProfile()
  const mine = profile?.subjects?.length ? SUBJECTS.filter((s) => profile.subjects.includes(s.id)) : SUBJECTS
  return mine
}

function ThemeButton({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  return (
    <button type="button" onClick={toggle} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} className={cn('p-2 rounded-control text-ink-2 hover:bg-surface-2 hover:text-ink focus-ring cursor-pointer', className)}>
      {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
    </button>
  )
}

function UserChip() {
  const { user, isGuest, signOut, openAuth, firebaseEnabled } = useAuth()
  const { profile } = useProfile()
  const navigate = useNavigate()
  const name = profile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'Guest'
  return (
    <div className="border-t border-border pt-3 space-y-2">
      {isGuest && firebaseEnabled && (
        <Button variant="secondary" size="sm" className="w-full" onClick={openAuth}>Create account to sync</Button>
      )}
      <div className="flex items-center gap-2.5 px-1">
        <span className="w-8 h-8 rounded-full bg-surface-2 text-ink-2 flex items-center justify-center shrink-0"><UserRound className="w-4 h-4" aria-hidden /></span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-ink truncate">{name}</div>
          <div className="text-xs text-ink-3">{isGuest ? 'Guest · saved on this device' : 'Signed in'}</div>
        </div>
        <ThemeButton />
        <button type="button" aria-label="Sign out" title="Sign out" onClick={async () => { await signOut(); navigate('/') }} className="p-2 rounded-control text-ink-3 hover:text-conf-red hover:bg-surface-2 focus-ring cursor-pointer"><LogOut className="w-[18px] h-[18px]" /></button>
      </div>
    </div>
  )
}

function Sidebar() {
  const mine = useMySubjects()
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col gap-5 bg-surface border-r border-border px-4 py-5 z-30" aria-label="Sidebar">
      <Logo className="px-1" />
      <nav className="flex-1 overflow-y-auto scrollbar-thin space-y-6" aria-label="Main">
        <div className="space-y-1">
          <NavItem to="/dashboard" icon={Home}>Home</NavItem>
        </div>
        <div>
          <div className="px-3 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-ink-3">Subjects</div>
          <div className="space-y-1">
            {mine.map((s) => (
              <NavLink key={s.id} to={`/s/${s.id}`} className={({ isActive }) => cn(linkBase, isActive ? linkActive : linkIdle)}>
                <span className={cn('w-2.5 h-2.5 rounded-full shrink-0 ml-[3px] mr-[3px]', s.cls.dot)} aria-hidden />
                <span className="flex-1 truncate">{s.name}</span>
                <span className="text-xs font-mono text-ink-3">{s.code}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <NavItem to="/notes" icon={NotebookPen}>Notes</NavItem>
          <NavItem to="/grades" icon={GraduationCap}>Grades</NavItem>
          <NavItem to="/coach" icon={Sparkles} soon>Coach</NavItem>
          <NavItem to="/settings" icon={Settings}>Settings</NavItem>
        </div>
      </nav>
      <UserChip />
    </aside>
  )
}

const tabBase = 'flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-bold focus-ring rounded-control cursor-pointer'

function BottomBar() {
  const [open, setOpen] = useState(false)
  const mine = useMySubjects()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const tab = (isActive: boolean) => cn(tabBase, isActive ? 'text-flame-strong dark:text-flame' : 'text-ink-3')
  return (
    <>
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur border-t border-border flex px-1 pb-[env(safe-area-inset-bottom)]" aria-label="Main">
        <NavLink to="/dashboard" className={({ isActive }) => tab(isActive)}><Home className="w-5 h-5" />Home</NavLink>
        <button type="button" onClick={() => setOpen(true)} className={tab(pathname.startsWith('/s/'))} aria-haspopup="dialog"><BookOpen className="w-5 h-5" />Subjects</button>
        <NavLink to="/notes" className={({ isActive }) => tab(isActive)}><NotebookPen className="w-5 h-5" />Notes</NavLink>
        <NavLink to="/grades" className={({ isActive }) => tab(isActive)}><GraduationCap className="w-5 h-5" />Grades</NavLink>
        <NavLink to="/coach" className={({ isActive }) => tab(isActive)}><Sparkles className="w-5 h-5" />Coach</NavLink>
      </nav>
      <Sheet open={open} onClose={() => setOpen(false)} title="Your subjects">
        <div className="space-y-2">
          {mine.map((s) => (
            <button key={s.id} type="button" onClick={() => { setOpen(false); navigate(`/s/${s.id}`) }} className="w-full flex items-center gap-3 p-3 rounded-control border border-border bg-surface-2/50 hover:bg-surface-2 text-left focus-ring cursor-pointer">
              <span className={cn('w-3 h-3 rounded-full', s.cls.dot)} aria-hidden />
              <span className="flex-1 font-bold text-ink">{s.name}</span>
              <span className="text-xs font-mono text-ink-3">{s.code}</span>
            </button>
          ))}
        </div>
      </Sheet>
    </>
  )
}

function TopBar() {
  return (
    <header className="lg:hidden sticky top-0 z-30 bg-bg/90 backdrop-blur border-b border-border flex items-center justify-between px-4 h-14">
      <Link to="/dashboard" className="flex items-center gap-2 font-display font-extrabold text-ink focus-ring rounded-control">
        <span className="w-8 h-8 rounded-[10px] bg-flame-strong flex items-center justify-center" aria-hidden>🔥</span>
        Cook Your A Levels
      </Link>
      <div className="flex items-center">
        <ThemeButton />
        <Link to="/settings" aria-label="Settings" className="p-2 rounded-control text-ink-2 hover:bg-surface-2 focus-ring"><Settings className="w-[18px] h-[18px]" /></Link>
      </div>
    </header>
  )
}

/** App frame: sidebar (desktop), top bar + bottom tabs (mobile). Pages render in <Outlet/>. */
export default function AppShell() {
  const { error } = useToast()
  useEffect(() => onStoreError((m) => error(m)), [error])
  return (
    <div className="min-h-screen bg-bg">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:bg-surface focus:px-3 focus:py-2 focus:rounded-control">Skip to content</a>
      <Sidebar />
      <TopBar />
      <main id="main" className="lg:pl-64 pb-24 lg:pb-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
      <BottomBar />
    </div>
  )
}
