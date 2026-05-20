import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import type { Topic } from '../../types'

interface Props {
  subjectId: string
  topics: Topic[]
  level: string
}

export default function TopicList({ subjectId, topics, level }: Props) {
  if (topics.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
        <p className="font-body font-semibold text-slate-400 text-sm">No topics loaded yet.</p>
        <p className="font-body text-xs text-slate-300 mt-1">Run the ingestion pipeline to populate topics.</p>
      </div>
    )
  }

  // Group by parentTopicId (component)
  const grouped = new Map<string, Topic[]>()
  for (const t of topics) {
    const key = t.parentTopicId ?? 'General'
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key)!.push(t)
  }

  return (
    <div className="space-y-4">
      {[...grouped.entries()].map(([component, componentTopics]) => (
        <div key={component} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
            <h3 className="font-body font-bold text-slate-600 text-xs uppercase tracking-wider">
              {component}
            </h3>
          </div>
          <div className="divide-y divide-slate-50">
            {componentTopics.map(topic => (
              <Link
                key={topic.id}
                to={`/subject/${subjectId}/topic/${topic.id}?level=${level}`}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-brand-primary/5 transition-colors duration-150 cursor-pointer group"
              >
                <span className="font-body text-sm text-brand-text group-hover:text-brand-primary transition-colors duration-150">
                  {topic.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-body text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                    {topic.questionCount} Qs
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-primary transition-colors duration-150" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
