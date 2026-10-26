import type { SessionCode } from '../../types/content'

/** Approximate first exam day of a session: Feb/March -> 1 Mar, May/June -> 1 May, Oct/Nov -> 1 Oct. */
export function examStart(year: number, session: SessionCode): Date {
  const month = session === 'm' ? 2 : session === 'w' ? 9 : 4
  return new Date(year, month, 1)
}

/** Whole days from today (local midnight) until the session starts. Negative once it has started. */
export function daysUntil(year: number, session: SessionCode, from: Date = new Date()): number {
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime()
  const b = examStart(year, session).getTime()
  return Math.round((b - a) / 86_400_000)
}

/** Upcoming (or current-year) session choices for pickers. */
export function sessionOptions(now: Date = new Date()): { year: number; session: SessionCode; label: string }[] {
  const out: { year: number; session: SessionCode; label: string }[] = []
  const names: Record<SessionCode, string> = { m: 'Feb/March', s: 'May/June', w: 'Oct/Nov' }
  for (let y = now.getFullYear(); y <= now.getFullYear() + 2; y++) {
    for (const s of ['m', 's', 'w'] as SessionCode[]) {
      if (daysUntil(y, s, now) >= -30) out.push({ year: y, session: s, label: `${names[s]} ${y}` })
    }
  }
  return out
}

export const GRADES = ['A*', 'A', 'B', 'C', 'D', 'E'] as const
