import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'

interface FieldProps { label?: ReactNode; hint?: ReactNode; error?: ReactNode }

const control =
  'w-full bg-surface text-ink placeholder:text-ink-3 border border-border rounded-control px-3.5 text-sm transition-colors focus-ring hover:border-ink-3/60 disabled:opacity-60 aria-[invalid=true]:border-conf-red'

function Wrap({ id, label, hint, error, children }: FieldProps & { id: string; children: ReactNode }) {
  return (
    <div className="block">
      {label && <label htmlFor={id} className="block text-sm font-bold text-ink mb-1.5">{label}</label>}
      {children}
      {error ? <p id={`${id}-msg`} role="alert" className="mt-1.5 text-sm text-conf-red">{error}</p>
        : hint ? <p id={`${id}-msg`} className="mt-1.5 text-sm text-ink-3">{hint}</p> : null}
    </div>
  )
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, FieldProps {}
/** Text input with optional label/hint/error. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, hint, error, className, id, ...rest }, ref) {
  const gen = useId(); const fid = id ?? gen
  return (
    <Wrap id={fid} label={label} hint={hint} error={error}>
      <input ref={ref} id={fid} aria-invalid={!!error || undefined} aria-describedby={error || hint ? `${fid}-msg` : undefined} className={cn(control, 'h-10', className)} {...rest} />
    </Wrap>
  )
})

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldProps {}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ label, hint, error, className, id, rows = 4, ...rest }, ref) {
  const gen = useId(); const fid = id ?? gen
  return (
    <Wrap id={fid} label={label} hint={hint} error={error}>
      <textarea ref={ref} id={fid} rows={rows} aria-invalid={!!error || undefined} aria-describedby={error || hint ? `${fid}-msg` : undefined} className={cn(control, 'py-2.5 resize-y leading-relaxed', className)} {...rest} />
    </Wrap>
  )
})

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, FieldProps {}
/** Native <select> styled to match. Pass <option>s as children. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ label, hint, error, className, id, children, ...rest }, ref) {
  const gen = useId(); const fid = id ?? gen
  return (
    <Wrap id={fid} label={label} hint={hint} error={error}>
      <div className="relative">
        <select ref={ref} id={fid} aria-invalid={!!error || undefined} aria-describedby={error || hint ? `${fid}-msg` : undefined} className={cn(control, 'h-10 appearance-none pr-9 cursor-pointer', className)} {...rest}>{children}</select>
        <ChevronDown className="w-4 h-4 text-ink-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden />
      </div>
    </Wrap>
  )
})
