import { ArrowRight, Calculator, Atom, Cpu } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const subjects = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: Calculator,
    topBorder: 'border-t-brand-primary',
    iconStyle: 'bg-brand-primary/10 text-brand-primary',
    description: 'Pure, Mechanics, Statistics, and Further Mathematics. Full coverage of AS and A Level syllabuses.',
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: Atom,
    topBorder: 'border-t-blue-400',
    iconStyle: 'bg-blue-50 text-blue-500',
    description: 'From waves to nuclear physics. All topics for AS and A Level with clear mark-scheme solutions.',
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    code: '9618',
    icon: Cpu,
    topBorder: 'border-t-brand-cta',
    iconStyle: 'bg-brand-cta/10 text-brand-cta',
    description: 'Theory, algorithms, data structures, and programming. Papers 1–4 for AS and A Level.',
  },
]

export default function Subjects() {
  const { signInWithGoogle } = useAuth()

  return (
    <section className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-brand-text mb-4">
            Subjects available now
          </h2>
          <p className="font-body text-lg text-slate-500">
            More subjects coming. Start revising these three today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {subjects.map((subject) => {
            const Icon = subject.icon
            return (
              <div
                key={subject.id}
                className={`bg-white rounded-2xl border-t-4 ${subject.topBorder} p-8 shadow-sm hover:shadow-md transition-shadow duration-200`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${subject.iconStyle}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-heading text-2xl font-bold text-brand-text">
                    {subject.name}
                  </h3>
                  {subject.code && (
                    <span className="text-xs font-body font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {subject.code}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mb-4">
                  <span className="text-xs font-body font-semibold text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-full">
                    AS Level
                  </span>
                  <span className="text-xs font-body font-semibold text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-full">
                    A Level
                  </span>
                </div>

                <p className="font-body text-sm text-slate-500 leading-relaxed mb-6">
                  {subject.description}
                </p>

                <button
                  onClick={signInWithGoogle}
                  className="flex items-center gap-1.5 text-sm font-body font-semibold text-brand-primary hover:text-indigo-700 transition-colors duration-150 cursor-pointer"
                >
                  Start practising
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
