import { useMemo } from 'react'
import katex from 'katex'

interface Props {
  content: string
  className?: string
}

function renderMixed(content: string): string {
  // Split on $$...$$ (display) and $...$ (inline), preserving delimiters in tokens
  const tokens = content.split(/(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g)
  return tokens.map(token => {
    if (token.startsWith('$$') && token.endsWith('$$')) {
      const latex = token.slice(2, -2)
      try {
        return katex.renderToString(latex, { displayMode: true, throwOnError: false })
      } catch {
        return `<span class="text-red-500 font-mono text-xs">[math error]</span>`
      }
    }
    if (token.startsWith('$') && token.endsWith('$')) {
      const latex = token.slice(1, -1)
      try {
        return katex.renderToString(latex, { displayMode: false, throwOnError: false })
      } catch {
        return `<span class="text-red-500 font-mono text-xs">[math error]</span>`
      }
    }
    // Plain text — escape HTML entities
    return token
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }).join('')
}

export default function KaTeXRenderer({ content, className }: Props) {
  const html = useMemo(() => renderMixed(content), [content])
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
