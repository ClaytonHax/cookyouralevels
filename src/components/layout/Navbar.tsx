import { Link, useNavigate } from 'react-router-dom'
import { Flame, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function Navbar() {
  const { user, openAuth, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/85 border-b border-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-lg text-brand-text">
              Cook Your <span className="text-brand-primary">A Levels</span>
            </span>
          </Link>

          {user ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-body text-slate-500 hover:text-brand-primary hover:bg-indigo-50 rounded-lg transition-colors duration-150 cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <div className="flex items-center gap-2 px-2">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName ?? 'User'}
                    className="w-7 h-7 rounded-full border-2 border-brand-primary/20"
                  />
                )}
                <span className="text-sm font-body text-brand-text hidden sm:block font-semibold">
                  {user.displayName?.split(' ')[0] ?? user.email?.split('@')[0]}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-body text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-150 cursor-pointer"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={openAuth}
              className="flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-indigo-600 text-white text-sm font-body font-semibold rounded-lg transition-colors duration-150 cursor-pointer"
            >
                  Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
