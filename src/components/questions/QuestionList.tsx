import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import type { Question } from '../../types'
import type { QueryDocumentSnapshot } from '../../lib/firestore'
import { getQuestionsByTopic } from '../../lib/firestore'
import QuestionCard from './QuestionCard'

interface Props {
  subjectId: string
  topicId: string
  yearFilter?: number
}

export default function QuestionList({ subjectId, topicId, yearFilter }: Props) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const PAGE_SIZE = 20

  async function load(reset: boolean) {
    if (reset) setLoading(true)
    else setLoadingMore(true)

    const { questions: qs, lastDoc: ld } = await getQuestionsByTopic(subjectId, topicId, {
      year: yearFilter,
      pageSize: PAGE_SIZE,
      afterDoc: reset ? null : lastDoc,
    })

    if (reset) {
      setQuestions(qs)
    } else {
      setQuestions(prev => [...prev, ...qs])
    }
    setLastDoc(ld)
    setHasMore(qs.length === PAGE_SIZE)
    setLoading(false)
    setLoadingMore(false)
  }

  useEffect(() => {
    setLastDoc(null)
    load(true)
  }, [subjectId, topicId, yearFilter])

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse">
            <div className="h-3 bg-slate-100 rounded w-12 mb-3" />
            <div className="h-4 bg-slate-100 rounded w-full mb-2" />
            <div className="h-4 bg-slate-100 rounded w-3/4" />
          </div>
        ))}
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
        <p className="font-body font-semibold text-slate-400 text-sm">No questions found</p>
        <p className="font-body text-xs text-slate-300 mt-1">Try adjusting the year filter.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {questions.map(q => (
        <QuestionCard key={q.id} question={q} />
      ))}

      {hasMore && (
        <button
          onClick={() => load(false)}
          disabled={loadingMore}
          className="w-full py-3 rounded-2xl border-2 border-slate-100 font-body font-semibold text-sm text-slate-500 hover:border-brand-primary hover:text-brand-primary transition-colors duration-150 cursor-pointer disabled:opacity-50"
        >
          {loadingMore ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading...
            </span>
          ) : 'Load more questions'}
        </button>
      )}
    </div>
  )
}
