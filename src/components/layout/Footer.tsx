import { Link } from 'react-router-dom'
import { Flame } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-7 h-7 bg-brand-primary rounded-lg flex items-center justify-center">
              <Flame className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-heading font-bold text-base text-brand-text">
              Cook Your <span className="text-brand-primary">A Levels</span>
            </span>
          </Link>
          <p className="font-body text-xs text-slate-400 text-center max-w-sm">
            Not affiliated with Cambridge Assessment International Education.
            Built for students, by students.
          </p>
          <p className="font-body text-xs text-slate-400">
            © {new Date().getFullYear()} Cook Your A Levels
          </p>
        </div>
      </div>
    </footer>
  )
}
