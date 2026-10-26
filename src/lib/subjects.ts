import type { SubjectId, SubjectMeta } from '../types/content'

/** Subject metadata plus static Tailwind class strings (kept literal so Tailwind can see them). */
export interface SubjectTheme extends SubjectMeta {
  /** Tailwind classes: `dot` bg solid, `text` coloured text, `soft` tinted bg, `border`, `bar` progress fill, `ring` svg stroke colour class */
  cls: { dot: string; text: string; soft: string; border: string; bar: string; stroke: string; accentTop: string }
  /** CSS colour value using the token var, for inline styles / SVG. */
  color: string
}

export const SUBJECTS: SubjectTheme[] = [
  {
    id: 'mathematics', code: '9709', name: 'Mathematics', short: 'Maths',
    cls: { dot: 'bg-maths', text: 'text-maths', soft: 'bg-maths-soft', border: 'border-maths', bar: 'bg-maths', stroke: 'stroke-maths', accentTop: 'border-t-maths' },
    color: 'rgb(var(--maths))',
  },
  {
    id: 'physics', code: '9702', name: 'Physics', short: 'Physics',
    cls: { dot: 'bg-physics', text: 'text-physics', soft: 'bg-physics-soft', border: 'border-physics', bar: 'bg-physics', stroke: 'stroke-physics', accentTop: 'border-t-physics' },
    color: 'rgb(var(--physics))',
  },
  {
    id: 'computer-science', code: '9618', name: 'Computer Science', short: 'CS',
    cls: { dot: 'bg-cs', text: 'text-cs', soft: 'bg-cs-soft', border: 'border-cs', bar: 'bg-cs', stroke: 'stroke-cs', accentTop: 'border-t-cs' },
    color: 'rgb(var(--cs))',
  },
]

export const SUBJECT_IDS: SubjectId[] = SUBJECTS.map((s) => s.id)

/** Type guard for route params etc. */
export function isSubjectId(v: unknown): v is SubjectId {
  return typeof v === 'string' && SUBJECT_IDS.includes(v as SubjectId)
}

/** Look up a subject; undefined if the id is unknown. */
export function getSubject(id: string | undefined): SubjectTheme | undefined {
  return SUBJECTS.find((s) => s.id === id)
}
