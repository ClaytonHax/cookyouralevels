import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import Reveal from './Reveal'

export default function Section({ id, eyebrow, title, intro, children, className }: { id?: string; eyebrow?: string; title: ReactNode; intro?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn('scroll-mt-20 py-16 sm:py-20', className)}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          {eyebrow && <p className="text-xs font-bold uppercase tracking-[.14em] text-flame-strong dark:text-flame">{eyebrow}</p>}
          <h2 className="font-display font-extrabold text-ink text-3xl sm:text-4xl tracking-tight mt-2">{title}</h2>
          {intro && <p className="text-ink-2 mt-3 text-lg leading-relaxed">{intro}</p>}
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
