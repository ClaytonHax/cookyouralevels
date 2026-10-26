import { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { cn } from '../../lib/cn'

const remarkPlugins = [remarkGfm, remarkMath]
const rehypePlugins = [[rehypeKatex, { throwOnError: false }]] as never

export interface MarkdownProps {
  /** Markdown source with $inline$ and $$display$$ KaTeX. */
  children: string
  className?: string
}

/** Styled prose renderer (GFM + KaTeX). Links open in a new tab when external. */
export const Markdown = memo(function Markdown({ children, className }: MarkdownProps) {
  return (
    <div className={cn('prose-cyal', className)}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={{
          a: ({ href, children: c, ...p }) => {
            const ext = !!href && /^https?:/.test(href)
            return <a href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...p}>{c}</a>
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
})
