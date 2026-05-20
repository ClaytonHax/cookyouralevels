import { Link, useNavigate } from 'react-router-dom'
import { Flame, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

export default function Navbar() {
  const { user, signInWithGoogle, signOut } = useAuth()
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
                  {user.displayName?.split(' ')[0]}
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
              onClick={signInWithGoogle}
              className="flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-indigo-600 text-white text-sm font-body font-semibold rounded-lg transition-colors duration-150 cursor-pointer"
            >
              <GoogleIcon />
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
