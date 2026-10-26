import { useState } from 'react'
import type { FormEvent } from 'react'
import { UserRound } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Button, Input, Modal } from './ui'

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
    case 'auth/unavailable':
      return 'Accounts are not available right now. You can still try the app without an account.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

export default function AuthModal() {
  const { authOpen, closeAuth, signIn, signUp, continueAsGuest, firebaseEnabled } = useAuth()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

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
    <Modal
      open={authOpen}
      onClose={closeAuth}
      size="sm"
      title={firebaseEnabled ? (mode === 'signin' ? 'Welcome back' : 'Create your account') : 'Get started'}
      description={
        firebaseEnabled
          ? mode === 'signin' ? 'Sign in with your email and password.' : 'Free. Just an email and password.'
          : 'Accounts are switched off in this build. Jump straight in. Your progress stays on this device.'
      }
    >
      {firebaseEnabled && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input type="email" required autoComplete="email" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} data-autofocus />
          <Input type="password" required minLength={6} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} placeholder="Password" aria-label="Password" value={password} onChange={(e) => setPassword(e.target.value)} error={error || undefined} />
          <Button type="submit" loading={busy} className="w-full">{mode === 'signin' ? 'Sign in' : 'Sign up'}</Button>
          <button
            type="button"
            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError('') }}
            className="text-sm text-flame-strong dark:text-flame font-bold hover:underline focus-ring rounded cursor-pointer"
          >
            {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
          <div className="flex items-center gap-3 text-xs text-ink-3 pt-1"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
        </form>
      )}
      <Button variant="secondary" className="w-full" leftIcon={<UserRound className="w-4 h-4" />} onClick={continueAsGuest} data-autofocus={firebaseEnabled ? undefined : true}>
        Try without an account
      </Button>
      <p className="text-xs text-ink-3 mt-2 text-center">Progress is saved on this device only.</p>
    </Modal>
  )
}
