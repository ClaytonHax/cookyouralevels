import type { ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import SubjectPage from './pages/SubjectPage'
import TopicPage from './pages/TopicPage'
import PaperPage from './pages/PaperPage'

function Spinner() {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-4 border-brand-primary border-t-transparent animate-spin" />
    </div>
  )
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <Spinner />
  if (!user) return <Navigate to="/" replace />
  return <>{children}</>
}

function PublicRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <Spinner />
  if (user) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/subject/:subjectId" element={<ProtectedRoute><SubjectPage /></ProtectedRoute>} />
      <Route path="/subject/:subjectId/topic/:topicId" element={<ProtectedRoute><TopicPage /></ProtectedRoute>} />
      <Route path="/subject/:subjectId/paper/:paperId" element={<ProtectedRoute><PaperPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
