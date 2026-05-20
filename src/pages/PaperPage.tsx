import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import QuestionCard from '../components/questions/QuestionCard'
import { getPaper, getQuestionsByPaper } from '../lib/firestore'
import type { Paper, Question } from '../types'

const SUBJECT_NAMES: Record<string, string> = {
  mathematics: 'Mathematics',
  physics: 'Physics',
  'computer-science': 'Computer Science',
}

const SESSION_LABELS: Record<string, string> = {
  'may-june': 'May/June',
  'oct-nov': 'Oct/Nov',
  'feb-march': 'Feb/March',
}

export default function PaperPage() {
  const { subjectId = '', paperId = '' } = useParams<{ subjectId: string; paperId: string }>()

  const [paper, setPaper] = useState<Paper | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getPaper(subjectId, paperId),
      getQuestionsByPaper(paperId),
    ]).then(([p, qs]) => {
      setPaper(p)
      setQuestions(qs)
      setLoading(false)
    })
  }, [subjectId, paperId])

  const subjectName = SUBJECT_NAMES[subjectId] ?? 'Subject'
  const levelLabel = paper ? (paper.level === 'A2' ? 'A Level' : 'AS Level') : ''

  const totalMarks = questions.reduce((sum, q) => sum + (q.marks ?? 0), 0)

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Breadcrumb */}
        <Link
          to={`/subject/${subjectId}?level=${paper?.level === 'A2' ? 'a2' : 'as'}`}
          className="inline-flex items-center gap-2 text-sm font-body text-slate-400 hover:text-brand-primary transition-colors duration-150 cursor-pointer mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {subjectName}
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-brand-text mb-2">
            {paper
              ? `${SESSION_LABELS[paper.session] ?? paper.session} ${paper.year} · Paper ${paper.paperNumber} V${paper.variant}`
              : paperId}
          </h1>
          {paper && (
            <p className="font-body text-sm text-slate-400">
              {subjectName} · {levelLabel} · Cambridge CIE
            </p>
          )}
        </div>

        {/* Metadata bar */}
        {!loading && paper && (
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="flex items-center gap-1.5 font-body text-xs font-semibold text-slate-500 bg-white border border-slate-100 px-3 py-1.5 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              {questions.length} questions
            </span>
            <span className="font-body text-xs font-semibold text-slate-500 bg-white border border-slate-100 px-3 py-1.5 rounded-full">
              {totalMarks} total marks
            </span>
            <span className="font-body text-xs font-semibold text-slate-500 bg-white border border-slate-100 px-3 py-1.5 rounded-full">
              {levelLabel}
            </span>
          </div>
        )}

        {/* Questions */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse">
                <div className="h-3 bg-slate-100 rounded w-12 mb-3" />
                <div className="h-4 bg-slate-100 rounded w-full mb-2" />
                <div className="h-4 bg-slate-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : questions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
            <p className="font-body font-semibold text-slate-400 text-sm">No questions found for this paper.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map(q => (
              <QuestionCard key={q.id} question={q} showNumber />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
