import { useState, useEffect } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, LayoutGrid, FileText } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import TopicList from '../components/subject/TopicList'
import PaperGrid from '../components/subject/PaperGrid'
import { getTopics, getPapers } from '../lib/firestore'
import type { Topic, Paper, Level } from '../types'

const SUBJECT_NAMES: Record<string, string> = {
  mathematics: 'Mathematics',
  physics: 'Physics',
  'computer-science': 'Computer Science (9618)',
}

type Tab = 'topics' | 'papers'

export default function SubjectPage() {
  const { subjectId = '' } = useParams<{ subjectId: string }>()
  const [searchParams] = useSearchParams()
  const level: Level = searchParams.get('level') === 'a2' ? 'A2' : 'AS'
  const levelLabel = level === 'A2' ? 'A Level' : 'AS Level'
  const name = SUBJECT_NAMES[subjectId] ?? 'Subject'

  const [tab, setTab] = useState<Tab>('topics')
  const [topics, setTopics] = useState<Topic[]>([])
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      getTopics(subjectId, level),
      getPapers(subjectId, level),
    ]).then(([t, p]) => {
      setTopics(t)
      setPapers(p)
      setLoading(false)
    })
  }, [subjectId, level])

  const tabs: { id: Tab; label: string; icon: typeof LayoutGrid }[] = [
    { id: 'topics', label: 'By Topic', icon: LayoutGrid },
    { id: 'papers', label: 'By Paper', icon: FileText },
  ]

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

        <div className="mb-8">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-brand-text mb-1">
            {name}
          </h1>
          <p className="font-body text-slate-400">{levelLabel} · Cambridge CIE</p>
        </div>

        {/* Level switcher */}
        <div className="flex gap-2 mb-6">
          {(['as', 'a2'] as const).map(l => (
            <Link
              key={l}
              to={`/subject/${subjectId}?level=${l}`}
              className={`px-4 py-1.5 rounded-full text-sm font-body font-semibold transition-colors duration-150 cursor-pointer ${
                (l === 'a2' ? 'A2' : 'AS') === level
                  ? 'bg-brand-primary text-white'
                  : 'bg-white border border-slate-200 text-slate-500 hover:border-brand-primary hover:text-brand-primary'
              }`}
            >
              {l === 'as' ? 'AS Level' : 'A Level'}
            </Link>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-8 w-fit">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-semibold transition-all duration-150 cursor-pointer ${
                tab === id
                  ? 'bg-white text-brand-text shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse">
                <div className="h-3 bg-slate-100 rounded w-32 mb-3" />
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-4 bg-slate-50 rounded w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : tab === 'topics' ? (
          <TopicList subjectId={subjectId} topics={topics} level={searchParams.get('level') ?? 'as'} />
        ) : (
          <PaperGrid subjectId={subjectId} papers={papers} />
        )}
      </main>
    </div>
  )
}
