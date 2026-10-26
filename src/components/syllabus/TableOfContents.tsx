import { useEffect, useState } from 'react'
import { cn } from '../../lib/cn'

export interface TocItem { id: string; text: string }

/** Reads rendered h2s inside `rootRef`, gives them ids, and renders a jump list with scroll-spy. */
export default function TableOfContents({ root, deps, accent }: { root: React.RefObject<HTMLElement | null>; deps: unknown; accent: string }) {
  const [items, setItems] = useState<TocItem[]>([])
  const [active, setActive] = useState('')

  useEffect(() => {
    const el = root.current
    if (!el) return
    const hs = Array.from(el.querySelectorAll<HTMLElement>('h2'))
    const list = hs.map((h, i) => {
      if (!h.id) h.id = `sec-${i}-${(h.textContent ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
      h.style.scrollMarginTop = '5rem'
      return { id: h.id, text: h.textContent ?? '' }
    })
    setItems(list)
    setActive(list[0]?.id ?? '')
    if (!hs.length || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => { const v = entries.find((e) => e.isIntersecting); if (v) setActive(v.target.id) },
      { rootMargin: '-80px 0px -70% 0px' },
    )
    hs.forEach((h) => io.observe(h))
    return () => io.disconnect()
  }, [root, deps])

  if (items.length < 2) return null
  return (
    <nav aria-label="On this page">
      <div className="text-xs font-bold uppercase tracking-wider text-ink-3 mb-2">On this page</div>
      <ul className="border-l border-border">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              onClick={(e) => { e.preventDefault(); document.getElementById(it.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActive(it.id) }}
              aria-current={active === it.id ? 'location' : undefined}
              className={cn('block -ml-px border-l-2 pl-3 py-1.5 text-[13px] leading-snug focus-ring transition-colors', active === it.id ? cn('border-flame font-bold', accent) : 'border-transparent text-ink-2 hover:text-ink')}
            >{it.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
