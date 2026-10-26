import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import Icon from './Icon'
import Logo from './Logo'

const navLink =
  'px-4 py-2 rounded-xl font-semibold transition-colors duration-200 cursor-pointer min-h-[44px] inline-flex items-center gap-2'

const links = [
  { to: '/', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/settings', label: 'Settings', icon: 'settings' },
]

export default function Header() {
  const { user, logout, demo } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  async function handleLogout() {
    setOpen(false)
    await logout()
    navigate('/login')
  }

  const initial = (user?.displayName || user?.email || '?').trim().charAt(0).toUpperCase()

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto rounded-2xl bg-white/85 backdrop-blur-md shadow-softsm border border-white">
        <div className="px-3 sm:px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 font-display text-xl cursor-pointer rounded-xl" aria-label="Zishao Grades home">
            <Logo />
            <span>
              Zishao <span className="text-primary-strong">Grades</span>
            </span>
          </Link>

          {user && (
            <>
              <nav className="hidden md:flex items-center gap-1" aria-label="Main">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.end}
                    className={({ isActive }) =>
                      `${navLink} ${isActive ? 'bg-secondary/70 text-primary-strong' : 'hover:bg-secondary/40'}`
                    }
                  >
                    <Icon name={l.icon} size={18} />
                    {l.label}
                  </NavLink>
                ))}
                <span className="w-px h-6 bg-secondary mx-2" aria-hidden="true" />
                <span
                  className="w-9 h-9 rounded-full grid place-items-center font-display text-white bg-gradient-to-br from-primary to-primary-strong"
                  title={user.displayName || user.email}
                  aria-hidden="true"
                >
                  {initial}
                </span>
                <button onClick={handleLogout} className="icon-btn" aria-label="Log out" title="Log out">
                  <Icon name="log-out" />
                </button>
              </nav>

              <button
                className="md:hidden icon-btn"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen(!open)}
              >
                <Icon name={open ? 'x' : 'menu'} size={24} />
              </button>
            </>
          )}
        </div>

        {user && open && (
          <nav id="mobile-menu" className="md:hidden px-3 pb-3 flex flex-col gap-1 animate-fade-up" aria-label="Mobile">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `${navLink} ${isActive ? 'bg-secondary/70 text-primary-strong' : 'hover:bg-secondary/40'}`
                }
              >
                <Icon name={l.icon} size={18} />
                {l.label}
              </NavLink>
            ))}
            <button onClick={handleLogout} className={`${navLink} hover:bg-secondary/40 text-left`}>
              <Icon name="log-out" size={18} />
              Log out
            </button>
          </nav>
        )}
      </div>
      {demo && user && (
        <p className="max-w-5xl mx-auto mt-2 text-center text-xs font-semibold text-ink/70">
          Demo mode — your grades are saved on this device only.
        </p>
      )}
    </header>
  )
}
