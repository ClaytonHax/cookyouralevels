import { useRef, useState } from 'react'
import { Bold, Check, Code, Eye, Heading2, Italic, List, Pencil, Sigma, SquareFunction } from 'lucide-react'
import { Markdown, Tabs } from '../ui'
import { cn } from '../../lib/cn'
import type { SaveStatus } from './useNoteDraft'

interface Draft {
  title: string; body: string
  setTitle: (v: string) => void; setBody: (v: string) => void
  status: SaveStatus
}

export function SaveIndicator({ status }: { status: SaveStatus }) {
  return (
    <span className="text-xs font-semibold text-ink-3 inline-flex items-center gap-1 min-w-[4.5rem] justify-end" role="status" aria-live="polite">
      {status === 'dirty' && 'Saving…'}
      {status === 'saved' && (<><Check className="w-3.5 h-3.5 text-conf-green" aria-hidden /> Saved</>)}
    </span>
  )
}

type Wrap = { before: string; after: string; placeholder: string; block?: boolean }
const TOOLS: { id: string; label: string; icon: JSX.Element; wrap: Wrap }[] = [
  { id: 'bold', label: 'Bold', icon: <Bold className="w-4 h-4" />, wrap: { before: '**', after: '**', placeholder: 'bold' } },
  { id: 'italic', label: 'Italic', icon: <Italic className="w-4 h-4" />, wrap: { before: '*', after: '*', placeholder: 'italic' } },
  { id: 'heading', label: 'Heading', icon: <Heading2 className="w-4 h-4" />, wrap: { before: '## ', after: '', placeholder: 'Heading', block: true } },
  { id: 'list', label: 'Bulleted list', icon: <List className="w-4 h-4" />, wrap: { before: '- ', after: '', placeholder: 'item', block: true } },
  { id: 'code', label: 'Code', icon: <Code className="w-4 h-4" />, wrap: { before: '`', after: '`', placeholder: 'code' } },
  { id: 'math', label: 'Inline maths', icon: <Sigma className="w-4 h-4" />, wrap: { before: '$', after: '$', placeholder: 'x^2' } },
  { id: 'dmath', label: 'Display maths', icon: <SquareFunction className="w-4 h-4" />, wrap: { before: '\n$$\n', after: '\n$$\n', placeholder: 'E = mc^2' } },
]

/**
 * Title + markdown editor with toolbar. `layout`:
 *  - 'toggle' (compact/inline): edit | preview switch
 *  - 'split': side by side on lg, tabs below lg
 */
export default function NoteEditorPane({ draft, layout = 'split', autoFocusTitle, minHeight = 'min-h-[320px]' }: {
  draft: Draft; layout?: 'toggle' | 'split'; autoFocusTitle?: boolean; minHeight?: string
}) {
  const ta = useRef<HTMLTextAreaElement>(null)
  const [tab, setTab] = useState<'edit' | 'preview'>('edit')
  const { title, body, setTitle, setBody } = draft

  const apply = (w: Wrap) => {
    const el = ta.current
    if (!el) return
    let s = el.selectionStart, e = el.selectionEnd
    if (w.block) {
      // snap to line start
      s = body.lastIndexOf('\n', s - 1) + 1
    }
    const sel = body.slice(s, e) || w.placeholder
    const next = body.slice(0, s) + w.before + sel + w.after + body.slice(e)
    setBody(next)
    const from = s + w.before.length
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(from, from + sel.length) })
  }

  const toolbar = (
    <div role="toolbar" aria-label="Formatting" className="flex items-center gap-0.5 overflow-x-auto scrollbar-thin">
      {TOOLS.map((t) => (
        <button key={t.id} type="button" aria-label={t.label} title={t.label} onClick={() => apply(t.wrap)}
          className="w-9 h-9 shrink-0 grid place-items-center rounded-control text-ink-2 hover:bg-surface-2 hover:text-ink cursor-pointer">
          {t.icon}
        </button>
      ))}
    </div>
  )

  const textarea = (
    <textarea ref={ta} value={body} onChange={(e) => setBody(e.target.value)} aria-label="Note body (Markdown)"
      placeholder={'Write in Markdown. Use $x^2$ for maths.'}
      className={cn('w-full h-full resize-y bg-surface text-ink placeholder:text-ink-3 border border-border rounded-control px-3.5 py-3 text-[15px] leading-relaxed font-mono focus-ring', minHeight)} />
  )
  const preview = (
    <div className={cn('border border-border rounded-control bg-surface px-4 py-3 overflow-auto', minHeight)} aria-label="Preview">
      {body.trim() ? <Markdown>{body}</Markdown> : <p className="text-sm text-ink-3">Nothing to preview yet.</p>}
    </div>
  )

  return (
    <div className="space-y-3">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Untitled note" aria-label="Note title"
        autoFocus={autoFocusTitle}
        className="w-full bg-transparent font-display text-2xl font-extrabold text-ink placeholder:text-ink-3 rounded-control focus-ring px-1 py-1" />
      <div className="flex items-center justify-between gap-2">
        {toolbar}
        <div className="flex items-center gap-2 shrink-0">
          {layout === 'toggle' && (
            <button type="button" onClick={() => setTab(tab === 'edit' ? 'preview' : 'edit')}
              className="h-9 px-3 inline-flex items-center gap-1.5 text-sm font-semibold rounded-control text-ink-2 hover:bg-surface-2 cursor-pointer">
              {tab === 'edit' ? <><Eye className="w-4 h-4" aria-hidden /> Preview</> : <><Pencil className="w-4 h-4" aria-hidden /> Edit</>}
            </button>
          )}
          <SaveIndicator status={draft.status} />
        </div>
      </div>
      {layout === 'toggle' ? (tab === 'edit' ? textarea : preview) : (
        <>
          <div className="lg:hidden space-y-3">
            <Tabs label="Editor view" idPrefix="ne" value={tab} onChange={(v) => setTab(v as 'edit' | 'preview')}
              items={[{ id: 'edit', label: 'Write' }, { id: 'preview', label: 'Preview' }]} />
            {tab === 'edit' ? textarea : preview}
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4 items-stretch">
            <div>{textarea}</div>
            {preview}
          </div>
        </>
      )}
    </div>
  )
}
