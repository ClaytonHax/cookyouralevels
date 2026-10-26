import { Suspense, lazy } from 'react'
import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { useProfile } from './hooks/useUserData'
import AppShell from './components/layout/AppShell'
import SubjectLayout from './components/layout/SubjectLayout'
import { PageSkeleton, ToastProvider } from './components/ui'

const Landing = lazy(() => import('./pages/Landing'))
const Onboarding = lazy(() => import('./pages/Onboarding'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const SubjectOverview = lazy(() => import('./pages/SubjectOverview'))
const TopicHub = lazy(() => import('./pages/TopicHub'))
const QuestionBank = lazy(() => import('./pages/QuestionBank'))
const QuestionView = lazy(() => import('./pages/QuestionView'))
const Practice = lazy(() => import('./pages/Practice'))
const Papers = lazy(() => import('./pages/Papers'))
const Notes = lazy(() => import('./pages/Notes'))
const NoteEditor = lazy(() => import('./pages/NoteEditor'))
const Grades = lazy(() => import('./pages/Grades'))
const Coach = lazy(() => import('./pages/Coach'))
const Settings = lazy(() => import('./pages/Settings'))

function FullSpinner() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center" role="status" aria-label="Loading">
      <div className="w-8 h-8 rounded-full border-4 border-flame border-t-transparent animate-spin" />
    </div>
  )
}

/** Signed-in or guest users only. */
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <FullSpinner />
  if (!user) return <Navigate to="/" replace />
  return <>{children}</>
}

/** Landing is only for signed-out visitors. */
function PublicRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <FullSpinner />
  if (user) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

/** First run: no subjects picked yet -> onboarding. */
function RequireOnboarded() {
  const { profile, loading } = useProfile()
  if (loading) return <PageSkeleton />
  if (!profile || profile.subjects.length === 0) return <Navigate to="/onboarding" replace />
  return <Outlet />
}

function LegacySubjectRedirect() {
  const { subjectId } = useParams()
  return <Navigate to={`/s/${subjectId}`} replace />
}

const page = (node: ReactNode) => <Suspense fallback={<PageSkeleton />}>{node}</Suspense>

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute>{page(<Landing />)}</PublicRoute>} />
      <Route path="/onboarding" element={<ProtectedRoute>{page(<Onboarding />)}</ProtectedRoute>} />

      <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route element={<RequireOnboarded />}>
          <Route path="/dashboard" element={page(<Dashboard />)} />
          <Route path="/s/:subjectId" element={<SubjectLayout />}>
            <Route index element={page(<SubjectOverview />)} />
            <Route path="topic/:topicId" element={page(<TopicHub />)} />
            <Route path="questions" element={page(<QuestionBank />)} />
            <Route path="q/:questionId" element={page(<QuestionView />)} />
            <Route path="practice" element={page(<Practice />)} />
            <Route path="papers" element={page(<Papers />)} />
          </Route>
          <Route path="/notes" element={page(<Notes />)} />
          <Route path="/notes/:noteId" element={page(<NoteEditor />)} />
          <Route path="/grades" element={page(<Grades />)} />
          <Route path="/coach" element={page(<Coach />)} />
          <Route path="/settings" element={page(<Settings />)} />
        </Route>
      </Route>

      {/* Old routes */}
      <Route path="/subject/:subjectId/*" element={<LegacySubjectRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppRoutes />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}
