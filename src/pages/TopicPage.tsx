import { useState, useEffect } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Filter } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import QuestionList from '../components/questions/QuestionList'
import { getTopic } from '../lib/firestore'
import type { Topic } from '../types'

const SUBJECT_NAMES: Record<string, string> = {
  mathematics: 'Mathematics',
  physics: 'Physics',
  'computer-science': 'Computer Science',
}

const YEARS = Array.from({ length: 10 }, (_, i) => 2024 - i)

export default function TopicPage() {
  const { subjectId = '', topicId = '' } = useParams<{ subjectId: string; topicId: string }>()
  const [searchParams] = useSearchParams()
  const level = searchParams.get('level') ?? 'as'

  const [topic, setTopic] = useState<Topic | null>(null)
  const [yearFilter, setYearFilter] = useState<number | undefined>(undefined)

  useEffect(() => {
    getTopic(subjectId, topicId).then(setTopic)
  }, [subjectId, topicId])

  const subjectName = SUBJECT_NAMES[subjectId] ?? 'Subject'
  const levelLabel = level === 'a2' ? 'A Level' : 'AS Level'

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Breadcrumb */}
        <Link
          to={`/subject/${subjectId}?level=${level}`}
          className="inline-flex items-center gap-2 text-sm font-body text-slate-400 hover:text-brand-primary transition-colors duration-150 cursor-pointer mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {subjectName} · {levelLabel}
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-brand-text">
              {topic?.name ?? topicId}
            </h1>
            {topic && (
              <span className="font-body text-xs font-semibold text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-full">
                {topic.questionCount} questions
              </span>
            )}
          </div>
          <p className="font-body text-sm text-slate-400">
            {subjectName} · {levelLabel} · Cambridge CIE 2015–2024
          </p>
        </div>

        {/* Year filter */}
        <div className="flex items-center gap-3 mb-6">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-body text-sm text-slate-500">Year:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setYearFilter(undefined)}
              className={`px-3 py-1 rounded-full text-xs font-body font-semibold transition-colors duration-150 cursor-pointer ${
                yearFilter === undefined
                  ? 'bg-brand-primary text-white'
                  : 'bg-white border border-slate-200 text-slate-500 hover:border-brand-primary hover:text-brand-primary'
              }`}
            >
              All years
            </button>
            {YEARS.map(y => (
              <button
                key={y}
                onClick={() => setYearFilter(y)}
                className={`px-3 py-1 rounded-full text-xs font-body font-semibold transition-colors duration-150 cursor-pointer ${
                  yearFilter === y
                    ? 'bg-brand-primary text-white'
                    : 'bg-white border border-slate-200 text-slate-500 hover:border-brand-primary hover:text-brand-primary'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Questions */}
        <QuestionList
          subjectId={subjectId}
          topicId={topicId}
          yearFilter={yearFilter}
        />
      </main>
    </div>
  )
}
