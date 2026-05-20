import { ArrowRight, Sparkles } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const floatingCards = [
  {
    subject: 'Mathematics',
    topic: 'Integration',
    preview: 'Find ∫(3x² + 2x − 1) dx, giving your answer in terms of x.',
    accent: 'border-brand-primary',
    rotate: '-rotate-3',
    top: '10%',
    left: '0%',
  },
  {
    subject: 'Physics',
    topic: 'Electricity',
    preview: 'Calculate the resistance of a wire of length 2.0 m and cross-sectional area 1.5 × 10⁻⁶ m².',
    accent: 'border-blue-400',
    rotate: 'rotate-2',
    top: '38%',
    left: '8%',
  },
  {
    subject: 'Computer Science',
    topic: 'Algorithms',
    preview: 'Trace through the bubble sort algorithm for the list [5, 2, 8, 1, 9].',
    accent: 'border-brand-cta',
    rotate: '-rotate-1',
    top: '66%',
    left: '2%',
  },
]

export default function Hero() {
  const { signInWithGoogle } = useAuth()

  return (
    <section className="min-h-screen bg-brand-bg pt-16 flex items-center relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-primary/5 rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -left-16 w-72 h-72 bg-brand-cta/5 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-primary/10 text-brand-primary text-xs font-body font-semibold rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Cambridge CIE A Level Revision
            </div>

            <h1 className="font-heading text-6xl lg:text-7xl xl:text-8xl font-bold text-brand-text leading-[1.05] mb-6">
              Cook your<br />
              <span className="text-brand-primary">A Levels.</span>
            </h1>

            <p className="font-body text-lg text-slate-500 leading-relaxed mb-8 max-w-md">
              Topical past paper questions, fully worked solutions, and AI-powered revision
              tools — built for Cambridge Maths, Physics, and Computer Science.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <button
                onClick={signInWithGoogle}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-cta hover:bg-emerald-600 text-white font-body font-bold rounded-xl transition-colors duration-150 cursor-pointer text-base"
              >
                Get Started — it's free
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#how-it-works"
                className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-brand-primary/30 text-brand-primary hover:border-brand-primary hover:bg-brand-primary/5 font-body font-semibold rounded-xl transition-colors duration-150 cursor-pointer text-base"
              >
                See how it works
              </a>
            </div>

            <p className="text-sm font-body text-slate-400">
              Sign in with Google · No password needed · Free forever
            </p>
          </div>

          {/* Floating question cards */}
          <div className="hidden lg:block relative h-[440px]">
            {floatingCards.map((card) => (
              <div
                key={card.topic}
                className={`absolute bg-white rounded-2xl shadow-lg border-l-4 ${card.accent} p-5 w-72 ${card.rotate}`}
                style={{ top: card.top, left: card.left }}
              >
                <div className="text-[10px] font-body font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {card.subject}
                </div>
                <div className="text-sm font-body font-bold text-brand-text mb-2">{card.topic}</div>
                <div className="text-xs font-body text-slate-500 leading-relaxed">{card.preview}</div>
                <div className="mt-4 flex gap-1.5">
                  <div className="h-1.5 flex-1 rounded-full bg-slate-100" />
                  <div className="h-1.5 flex-1 rounded-full bg-slate-100" />
                  <div className="h-1.5 w-1/3 rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
