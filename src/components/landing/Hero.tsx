import { ArrowRight, UserRound } from 'lucide-react'
import { Button } from '../ui'
import Preview from './Preview'
import { useStart } from './useStart'

export default function Hero() {
  const { openAuth, tryAsGuest } = useStart()
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[520px] -z-10 bg-[radial-gradient(60%_60%_at_20%_0%,rgb(var(--flame)/0.14),transparent_70%)]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 lg:pb-24 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-10 items-center">
        <div className="animate-pop-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-flame-soft text-flame-strong dark:text-flame text-xs font-bold px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-flame" /> Free for CIE Maths, Physics &amp; Computer Science
          </span>
          <h1 className="font-display font-extrabold text-ink text-[40px] leading-[1.04] sm:text-6xl tracking-tight mt-5">
            Everything for your A Levels.{' '}
            <span className="text-flame-strong dark:text-flame">One kitchen.</span>
          </h1>
          <p className="text-lg text-ink-2 mt-5 max-w-xl leading-relaxed">
            The syllabus, clear notes, real topical past-paper questions with mark schemes, paper links and your grades, all wired together so you always know what to revise next.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button size="lg" onClick={openAuth} rightIcon={<ArrowRight className="w-4 h-4" />}>Start revising, free</Button>
            <Button size="lg" variant="secondary" onClick={tryAsGuest} leftIcon={<UserRound className="w-4 h-4" />}>Try without an account</Button>
          </div>
          <p className="text-sm text-ink-3 mt-4">No card, no catch. Guests keep progress on their own device.</p>
        </div>
        <Preview className="animate-pop-in [animation-delay:120ms] lg:rotate-[1.2deg] max-w-xl w-full mx-auto lg:mx-0" />
      </div>
    </section>
  )
}
