import { Check, ChevronRight, Eye } from 'lucide-react'
import { cn } from '../../lib/cn'

const dot = { r: 'bg-conf-red', a: 'bg-conf-amber', g: 'bg-conf-green', n: 'bg-border' }

const objectives: { t: string; c: ('r' | 'a' | 'g' | 'n') }[] = [
  { t: 'Complete the square and read off the vertex', c: 'g' },
  { t: 'Solve quadratic inequalities', c: 'a' },
  { t: 'Use the discriminant to find the number of roots', c: 'r' },
  { t: 'Solve disguised quadratic equations', c: 'n' },
]

/** Decorative, non-interactive product mock built from HTML/CSS. */
export default function Preview({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)} aria-hidden>
      <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-flame/20 via-maths/10 to-physics/10 blur-2xl" />
      <div className="card overflow-hidden shadow-lift">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-surface-2">
          <span className="w-2.5 h-2.5 rounded-full bg-conf-red/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-conf-amber/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-conf-green/70" />
          <span className="ml-3 text-[11px] font-mono text-ink-3 truncate">cook-your-a-levels / mathematics / quadratics</span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-maths">
                <span className="w-2 h-2 rounded-full bg-maths" /> Mathematics 9709 · Pure 1
              </div>
              <div className="font-display font-extrabold text-xl text-ink mt-1">1.1 Quadratics</div>
            </div>
            <div className="relative w-12 h-12 shrink-0">
              <svg viewBox="0 0 48 48" className="-rotate-90 w-12 h-12">
                <circle cx="24" cy="24" r="20" fill="none" strokeWidth="5" className="stroke-border" />
                <circle cx="24" cy="24" r="20" fill="none" strokeWidth="5" strokeLinecap="round" strokeDasharray="125.6" strokeDashoffset="52" className="stroke-maths" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-ink">58%</span>
            </div>
          </div>

          <div className="flex gap-1.5 mt-4 text-[11px] font-bold">
            {['Objectives', 'Notes', 'Questions', 'Papers'].map((t, i) => (
              <span key={t} className={cn('px-2.5 py-1 rounded-full', i === 0 ? 'bg-flame-soft text-flame-strong dark:text-flame' : 'bg-surface-2 text-ink-3')}>{t}</span>
            ))}
          </div>

          <ul className="mt-3 divide-y divide-border">
            {objectives.map((o) => (
              <li key={o.t} className="flex items-center gap-3 py-2.5">
                <span className="flex-1 text-[13px] text-ink-2 leading-snug">{o.t}</span>
                <span className="flex items-center gap-1 shrink-0">
                  {(['r', 'a', 'g'] as const).map((k) => (
                    <span key={k} className={cn('w-3.5 h-3.5 rounded-full border-2', o.c === k ? `${dot[k]} border-transparent scale-110` : 'border-border')} />
                  ))}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-control border border-border bg-surface-2/60 p-3.5">
            <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
              <span className="text-ink-3 font-mono truncate">9709 · May/June 2023 · Paper 12 · Q4</span>
              <span className="px-2 py-0.5 rounded-full bg-maths-soft text-maths shrink-0">5 marks</span>
            </div>
            <p className="font-mono text-[12.5px] text-ink mt-2 leading-relaxed">
              The curve y = x² − 6x + k meets the line y = 2x − 7 at exactly one point. Find k.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-control bg-surface border border-border text-[11px] font-bold text-ink-2"><Eye className="w-3.5 h-3.5" /> Mark scheme</span>
              <span className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-control bg-conf-green/10 text-[11px] font-bold text-conf-green"><Check className="w-3.5 h-3.5" /> Done</span>
              <span className="ml-auto inline-flex items-center text-[11px] font-bold text-ink-3">Next <ChevronRight className="w-3.5 h-3.5" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
