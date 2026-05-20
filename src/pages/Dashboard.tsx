import { Link } from 'react-router-dom'
import { Calculator, Atom, Cpu, ChevronRight, BookOpen, Clock, Layers, CheckSquare } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import { useAuth } from '../contexts/AuthContext'

const subjects = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: Calculator,
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: Atom,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    code: '9618',
    icon: Cpu,
    gradient: 'from-emerald-500 to-emerald-600',
  },
]

const stats = [
  { label: 'Questions done', value: '0', icon: CheckSquare },
  { label: 'Topics started', value: '0', icon: BookOpen },
  { label: 'Time practised', value: '0h', icon: Clock },
  { label: 'Subjects available', value: '3', icon: Layers },
]

export default function Dashboard() {
  const { user } = useAuth()
  const firstName = user?.displayName?.split(' ')[0] ?? 'there'

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Greeting */}
        <div className="mb-10 flex items-center gap-3">
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName ?? 'User'}
              className="w-12 h-12 rounded-full border-2 border-brand-primary/20"
            />
          )}
          <div>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-brand-text">
              Hey, {firstName}!
            </h1>
            <p className="font-body text-sm text-slate-400 mt-0.5">
              What are we cooking today?
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-100">
                <Icon className="w-4 h-4 text-brand-primary mb-2" />
                <div className="font-heading text-2xl font-bold text-brand-text">{stat.value}</div>
                <div className="font-body text-xs text-slate-400 mt-0.5">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Subjects */}
        <h2 className="font-body font-bold text-brand-text text-base mb-4">Choose a subject</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {subjects.map((subject) => {
            const Icon = subject.icon
            return (
              <div
                key={subject.id}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className={`bg-gradient-to-br ${subject.gradient} p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8 text-white" />
                    {subject.code && (
                      <span className="text-xs font-body font-semibold text-white/60 bg-white/20 px-2 py-0.5 rounded">
                        {subject.code}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white">{subject.name}</h3>
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <Link
                    to={`/subject/${subject.id}?level=as`}
                    className="flex items-center justify-between px-4 py-3 rounded-xl border-2 border-slate-100 hover:border-brand-primary hover:bg-brand-primary/5 transition-all duration-150 cursor-pointer group"
                  >
                    <span className="font-body font-semibold text-brand-text text-sm">AS Level</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-primary transition-colors duration-150" />
                  </Link>
                  <Link
                    to={`/subject/${subject.id}?level=a2`}
                    className="flex items-center justify-between px-4 py-3 rounded-xl border-2 border-slate-100 hover:border-brand-primary hover:bg-brand-primary/5 transition-all duration-150 cursor-pointer group"
                  >
                    <span className="font-body font-semibold text-brand-text text-sm">A Level</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-primary transition-colors duration-150" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
          <BookOpen className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="font-body font-semibold text-slate-400 text-sm">No activity yet</p>
          <p className="font-body text-xs text-slate-300 mt-1">
            Start practising to see your progress here.
          </p>
        </div>
      </main>
    </div>
  )
}
