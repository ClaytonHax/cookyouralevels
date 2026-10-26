import { Link } from 'react-router-dom'
import { BrandMark } from './Navbar'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-2/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5 focus-ring rounded-control">
            <BrandMark small />
            <span className="font-display font-extrabold text-ink tracking-tight">Cook Your A Levels</span>
          </Link>
          <p className="text-sm text-ink-2 mt-3 max-w-xs">Everything for your CIE A Levels in one place. Free, and built by students who needed it.</p>
        </div>
        <nav aria-label="Footer" className="text-sm">
          <h2 className="font-display font-bold text-ink mb-2">Explore</h2>
          <ul className="space-y-1.5 text-ink-2">
            <li><a className="hover:text-ink underline-offset-2 hover:underline" href="#features">Features</a></li>
            <li><a className="hover:text-ink underline-offset-2 hover:underline" href="#subjects">Subjects</a></li>
            <li><a className="hover:text-ink underline-offset-2 hover:underline" href="#faq">FAQ</a></li>
          </ul>
        </nav>
        <div className="text-sm">
          <h2 className="font-display font-bold text-ink mb-2">Sources</h2>
          <ul className="space-y-1.5 text-ink-2">
            <li><a className="hover:text-ink underline-offset-2 hover:underline" href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-subjects/" target="_blank" rel="noreferrer">Cambridge syllabuses</a></li>
            <li><a className="hover:text-ink underline-offset-2 hover:underline" href="https://pastpapers.papacambridge.com/" target="_blank" rel="noreferrer">PapaCambridge past papers</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="max-w-6xl mx-auto px-4 sm:px-6 py-4 text-xs text-ink-3">
          Not affiliated with Cambridge University Press &amp; Assessment. Past paper content belongs to its copyright holders. &copy; {new Date().getFullYear()} Cook Your A Levels.
        </p>
      </div>
    </footer>
  )
}
