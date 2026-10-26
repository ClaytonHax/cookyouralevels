import { ArrowRight } from 'lucide-react'
import { SUBJECTS } from '../../lib/subjects'
import type { SubjectTheme } from '../../lib/subjects'
import { useSyllabus, usePapers, useQuestions } from '../../hooks/useContent'
import { allTopics } from '../../lib/content'
import { Skeleton } from '../ui'
import Reveal from './Reveal'
import Section from './Section'

const blurb: Record<string, string> = {
  mathematics: 'Pure 1 to 3, Mechanics, Probability & Statistics. Algebra, calculus and everything in between.',
  physics: 'AS and A Level Physics, from kinematics to quantum, with structured and multiple-choice practice.',
  'computer-science': 'Theory, data structures, algorithms and the A2 topics, with exam-style questions.',
}

function Stat({ value, label, loading }: { value: number | null; label: string; loading: boolean }) {
  return (
    <div>
      <div className="font-display font-extrabold text-2xl text-ink tabular-nums h-8 flex items-center">
        {loading ? <Skeleton className="h-6 w-12" /> : value ? value.toLocaleString() : '-'}
      </div>
      <div className="text-xs text-ink-3 font-bold">{label}</div>
    </div>
  )
}

function SubjectCard({ s }: { s: SubjectTheme }) {
  const syl = useSyllabus(s.id)
  const qs = useQuestions(s.id)
  const papers = usePapers(s.id)
  const topics = syl.data ? allTopics(syl.data).length : null
  return (
    <div className={`card h-full overflow-hidden border-t-4 ${s.cls.accentTop}`}>
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-2 text-xs font-bold ${s.cls.text}`}><span className={`w-2 h-2 rounded-full ${s.cls.dot}`} /> CIE {s.code}</span>
        </div>
        <h3 className="font-display font-extrabold text-2xl text-ink mt-2">{s.name}</h3>
        <p className="text-sm text-ink-2 mt-2 leading-relaxed min-h-[63px]">{blurb[s.id]}</p>
        <div className={`grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-border`}>
          <Stat value={topics} label="Topics" loading={syl.loading} />
          <Stat value={qs.data ? qs.data.length : null} label="Questions" loading={qs.loading} />
          <Stat value={papers.data ? papers.data.length : null} label="Papers" loading={papers.loading} />
        </div>
      </div>
    </div>
  )
}

export default function Subjects() {
  return (
    <Section
      id="subjects"
      eyebrow="Subjects"
      title="Three subjects, done properly."
      intro="Start with the ones you take. More CIE subjects can follow once these are great."
      className="bg-surface-2/50 border-y border-border"
    >
      <ul className="grid md:grid-cols-3 gap-4">
        {SUBJECTS.map((s, i) => (
          <li key={s.id}><Reveal delay={i * 70} className="h-full"><SubjectCard s={s} /></Reveal></li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-ink-3 inline-flex items-center gap-1.5">Counts are read live from the content on this site <ArrowRight className="w-3.5 h-3.5" aria-hidden /></p>
    </Section>
  )
}
