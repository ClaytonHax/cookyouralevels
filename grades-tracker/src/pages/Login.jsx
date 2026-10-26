import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import AuthLayout, { PasswordInput } from '../components/AuthLayout'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Enter your email and password.')
      return
    }
    setBusy(true)
    try {
      await login(email.trim(), password)
      navigate('/')
    } catch (err) {
      setError(
        {
          'auth/invalid-credential': 'Wrong email or password.',
          'auth/invalid-email': 'That email address looks wrong.',
          'auth/user-not-found': 'Wrong email or password.',
          'auth/wrong-password': 'Wrong email or password.',
          'auth/too-many-requests': 'Too many attempts. Try again later.',
          'auth/network-request-failed': 'Network error. Check your connection.',
        }[err.code] || 'Could not sign in. Please try again.'
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to see how your grades are tracking.">
      <form onSubmit={onSubmit} className="card-soft space-y-4" noValidate>
        {error && (
          <p id="login-error" role="alert" className="bg-red-50 text-red-700 rounded-xl px-4 py-3 text-sm font-semibold">
            {error}
          </p>
        )}
        <div>
          <label htmlFor="login-email" className="label-soft">Email</label>
          <input
            id="login-email"
            type="email"
            className="input-soft"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            aria-describedby={error ? 'login-error' : undefined}
            aria-invalid={Boolean(error)}
            required
          />
        </div>
        <div>
          <label htmlFor="login-password" className="label-soft">Password</label>
          <PasswordInput
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            describedBy={error ? 'login-error' : undefined}
            invalid={Boolean(error)}
          />
        </div>
        <button type="submit" className="btn-primary w-full" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="text-sm text-center text-ink/70">
          No account?{' '}
          <Link to="/signup" className="text-primary-strong font-bold underline cursor-pointer">
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
