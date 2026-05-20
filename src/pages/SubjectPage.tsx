import { useParams, Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Construction } from 'lucide-react'
import Navbar from '../components/layout/Navbar'

const subjectNames: Record<string, string> = {
  mathematics: 'Mathematics',
  physics: 'Physics',
  'computer-science': 'Computer Science (9618)',
}

export default function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>()
  const [searchParams] = useSearchParams()
  const level = searchParams.get('level') === 'a2' ? 'A Level' : 'AS Level'
  const name = subjectNames[subjectId ?? ''] ?? 'Subject'

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-body text-slate-400 hover:text-brand-primary transition-colors duration-150 cursor-pointer mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="font-heading text-4xl lg:text-5xl font-bold text-brand-text mb-1">
          {name}
        </h1>
        <p className="font-body text-slate-400 mb-12">{level} · Cambridge CIE</p>

        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <Construction className="w-12 h-12 text-brand-primary/25 mx-auto mb-5" />
          <h2 className="font-heading text-2xl font-bold text-brand-text mb-2">
            Topics coming soon
          </h2>
          <p className="font-body text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
            We're building the question bank for {name}. Check back soon — or see{' '}
            <a
              href="https://github.com/ClaytonHax/cookyouralevels"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline cursor-pointer"
            >
              goal.md
            </a>{' '}
            for progress updates.
          </p>
        </div>
      </main>
    </div>
  )
}
