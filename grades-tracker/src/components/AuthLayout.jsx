import { useState } from 'react'
import { useAuth } from '../AuthContext'
import GradeBadge from './GradeBadge'
import Icon from './Icon'

export default function AuthLayout({ title, subtitle, children }) {
  const { demo } = useAuth()
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-stretch max-w-4xl mx-auto">
      <aside className="hidden md:flex relative overflow-hidden rounded-card p-8 text-white bg-gradient-to-br from-primary via-pink-600 to-ink shadow-lift flex-col justify-between">
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10" aria-hidden="true" />
        <div className="absolute -left-10 bottom-10 w-40 h-40 rounded-full bg-white/10" aria-hidden="true" />
        <div className="relative">
          <p className="chip bg-white/20 text-white mb-4">
            <Icon name="cap" size={14} /> Cambridge A Level & AS
          </p>
          <h2 className="font-display text-3xl leading-tight">See where every grade is taking you.</h2>
          <p className="mt-3 text-white/90">Log tests and mocks, set targets, and watch your averages climb.</p>
        </div>

        <div className="relative mt-10 bg-white rounded-2xl p-4 text-ink shadow-xl animate-float" aria-hidden="true">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-lg">Mathematics</p>
              <p className="text-xs text-ink/70">Target A* · 4 grades</p>
            </div>
            <GradeBadge grade="A" size="md" />
          </div>
          <div className="mt-3 h-2 rounded-full bg-surface overflow-hidden">
            <div className="h-full w-5/6 rounded-full bg-gradient-to-r from-primary to-primary-strong" />
          </div>
          <div className="mt-3 flex gap-1.5">
            {['B', 'A', 'A', 'A*'].map((g, i) => <GradeBadge key={i} grade={g} size="sm" className="!w-8 !h-8 !text-sm" />)}
          </div>
        </div>
      </aside>

      <div className="py-2 md:py-6">
        <h1 className="font-display text-3xl sm:text-4xl mb-2">{title}</h1>
        <p className="text-ink/70 mb-6">{subtitle}</p>
        {demo && (
          <p className="flex gap-2 items-start rounded-xl bg-white/80 border border-secondary px-4 py-3 text-sm mb-5">
            <Icon name="info" size={18} className="mt-0.5 text-primary-strong" />
            <span>
              <strong>Demo mode.</strong> Firebase isn’t set up yet, so any email works and data stays on this device.
            </span>
          </p>
        )}
        {children}
      </div>
    </div>
  )
}

export function PasswordInput({ id, value, onChange, autoComplete, describedBy, invalid }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <input
        id={id}
        type={show ? 'text' : 'password'}
        className="input-soft pr-12"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-describedby={describedBy}
        aria-invalid={invalid}
        required
      />
      <button
        type="button"
        className="absolute right-1 top-1/2 -translate-y-1/2 icon-btn !w-10 !h-10"
        onClick={() => setShow(!show)}
        aria-label={show ? 'Hide password' : 'Show password'}
        aria-pressed={show}
      >
        <Icon name={show ? 'eye-off' : 'eye'} size={18} />
      </button>
    </div>
  )
}
