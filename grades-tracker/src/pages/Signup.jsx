import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import AuthLayout, { PasswordInput } from '../components/AuthLayout'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim()) {
      setError('Add your name and email.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setBusy(true)
    try {
      await signup(email.trim(), password, name.trim())
      navigate('/')
    } catch (err) {
      setError(
        {
          'auth/email-already-in-use': 'That email already has an account.',
          'auth/invalid-email': 'That email address looks wrong.',
          'auth/weak-password': 'Password must be at least 6 characters.',
          'auth/network-request-failed': 'Network error. Check your connection.',
        }[err.code] || 'Could not create the account. Please try again.'
      )
    } finally {
      setBusy(false)
    }
  }

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3

  return (
    <AuthLayout title="Create your account" subtitle="Email and password — that’s all you need.">
      <form onSubmit={onSubmit} className="card-soft space-y-4" noValidate>
        {error && (
          <p role="alert" className="bg-red-50 text-red-700 rounded-xl px-4 py-3 text-sm font-semibold">
            {error}
          </p>
        )}
        <div>
          <label htmlFor="su-name" className="label-soft">Name</label>
          <input
            id="su-name"
            type="text"
            className="input-soft"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label htmlFor="su-email" className="label-soft">Email</label>
          <input
            id="su-email"
            type="email"
            className="input-soft"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label htmlFor="su-password" className="label-soft">Password</label>
          <PasswordInput
            id="su-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            describedBy="su-password-hint"
          />
          <div className="flex gap-1.5 mt-2" aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  strength >= n ? ['bg-red-500', 'bg-amber-400', 'bg-green-500'][strength - 1] : 'bg-secondary'
                }`}
              />
            ))}
          </div>
          <p id="su-password-hint" className="text-xs text-ink/70 mt-1">
            {['At least 6 characters.', 'A little longer, please.', 'Good — longer is even better.', 'Strong password.'][strength]}
          </p>
        </div>
        <button type="submit" className="btn-primary w-full" disabled={busy}>
          {busy ? 'Creating…' : 'Create account'}
        </button>
        <p className="text-sm text-center text-ink/70">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-strong font-bold underline cursor-pointer">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
