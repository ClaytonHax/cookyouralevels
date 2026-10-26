import { useState } from 'react'
import type { FormEvent } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

function friendlyError(code: string) {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password.'
    case 'auth/email-already-in-use':
      return 'An account with that email already exists.'
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.'
    case 'auth/invalid-email':
      return 'Enter a valid email address.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again later.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

export default function AuthModal() {
  const { authOpen, closeAuth, signIn, signUp } = useAuth()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (!authOpen) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await (mode === 'signin' ? signIn(email, password) : signUp(email, password))
      closeAuth()
      setPassword('')
    } catch (err) {
      setError(friendlyError((err as { code?: string }).code ?? ''))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4"
      onClick={closeAuth}
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeAuth}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="font-heading text-2xl font-bold text-brand-text mb-1">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="font-body text-sm text-slate-500 mb-5">
          {mode === 'signin' ? 'Sign in with your email and password.' : 'Free. Just an email and password.'}
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg font-body text-sm focus:outline-none focus:border-brand-primary"
          />
          <input
            type="password"
            required
            minLength={6}
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg font-body text-sm focus:outline-none focus:border-brand-primary"
          />
          {error && <p className="text-sm text-red-500 font-body">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full py-2.5 bg-brand-primary hover:bg-indigo-600 disabled:opacity-60 text-white font-body font-semibold rounded-lg transition-colors duration-150 cursor-pointer"
          >
            {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Sign up'}
          </button>
        </form>
        <button
          onClick={() => {
            setMode(mode === 'signin' ? 'signup' : 'signin')
            setError('')
          }}
          className="mt-4 text-sm font-body text-brand-primary hover:underline cursor-pointer"
        >
          {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  )
}
