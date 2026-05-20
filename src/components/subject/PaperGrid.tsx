import { Link } from 'react-router-dom'
import { FileText, ChevronRight } from 'lucide-react'
import type { Paper } from '../../types'

const SESSION_LABELS: Record<string, string> = {
  'may-june': 'May/June',
  'oct-nov': 'Oct/Nov',
  'feb-march': 'Feb/March',
}

interface Props {
  subjectId: string
  papers: Paper[]
}

export default function PaperGrid({ subjectId, papers }: Props) {
  if (papers.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
        <p className="font-body font-semibold text-slate-400 text-sm">No papers loaded yet.</p>
        <p className="font-body text-xs text-slate-300 mt-1">Run the ingestion pipeline to populate papers.</p>
      </div>
    )
  }

  // Group by year
  const byYear = new Map<number, Paper[]>()
  for (const p of papers) {
    if (!byYear.has(p.year)) byYear.set(p.year, [])
    byYear.get(p.year)!.push(p)
  }

  return (
    <div className="space-y-6">
      {[...byYear.entries()].map(([year, yearPapers]) => (
        <div key={year}>
          <h3 className="font-heading text-base font-bold text-brand-text mb-3">{year}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {yearPapers.map(paper => (
              <Link
                key={paper.id}
                to={`/subject/${subjectId}/paper/${paper.id}`}
                className="bg-white rounded-xl border border-slate-100 p-4 hover:border-brand-primary hover:shadow-sm transition-all duration-150 cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-brand-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-body font-semibold text-sm text-brand-text">
                      Paper {paper.paperNumber} · V{paper.variant}
                    </div>
                    <div className="font-body text-xs text-slate-400 mt-0.5">
                      {SESSION_LABELS[paper.session] ?? paper.session}
                    </div>
                    <div className="font-body text-xs text-slate-300 mt-1">
                      {paper.questionCount} questions
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-primary transition-colors duration-150 shrink-0 mt-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
