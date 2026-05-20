import { useState } from 'react'
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react'
import type { Question } from '../../types'
import KaTeXRenderer from './KaTeXRenderer'

interface Props {
  question: Question
  showNumber?: boolean
}

export default function QuestionCard({ question, showNumber = true }: Props) {
  const [msOpen, setMsOpen] = useState(false)

  const label = question.partLabel
    ? `${question.questionNumber}(${question.partLabel})`
    : `${question.questionNumber}`

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          {showNumber && (
            <span className="font-heading text-sm font-bold text-brand-primary shrink-0">
              Q{label}
            </span>
          )}
          <span className="ml-auto text-xs font-body font-semibold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full shrink-0">
            {question.marks} {question.marks === 1 ? 'mark' : 'marks'}
          </span>
        </div>

        <div className="font-body text-sm text-slate-700 leading-relaxed">
          <KaTeXRenderer content={question.content} />
        </div>

        {question.hasDiagram && question.diagramUrl && (
          <img
            src={question.diagramUrl}
            alt={`Diagram for question ${label}`}
            className="mt-4 max-w-full rounded-lg border border-slate-100"
            loading="lazy"
          />
        )}
      </div>

      {question.markScheme && (
        <div className="border-t border-slate-100">
          <button
            onClick={() => setMsOpen(o => !o)}
            className="w-full flex items-center justify-between px-5 py-3 text-sm font-body font-semibold text-slate-500 hover:text-brand-primary hover:bg-brand-primary/5 transition-colors duration-150 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              Mark scheme
            </span>
            {msOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {msOpen && (
            <div className="px-5 pb-5 font-body text-sm text-slate-700 leading-relaxed bg-emerald-50/40 border-t border-emerald-100">
              <KaTeXRenderer content={question.markScheme} className="block pt-3" />
              {question.markSchemeHasDiagram && question.markSchemeUrl && (
                <img
                  src={question.markSchemeUrl}
                  alt="Mark scheme diagram"
                  className="mt-3 max-w-full rounded-lg border border-emerald-100"
                  loading="lazy"
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
