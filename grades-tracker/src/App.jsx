import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import { PageSkeleton } from './components/Skeleton'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Subject from './pages/Subject'
import Settings from './pages/Settings'

function Protected({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <PageSkeleton />
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  const { user } = useAuth()
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 btn-ghost">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />
          <Route path="/" element={<Protected><Dashboard /></Protected>} />
          <Route path="/subject/:id" element={<Protected><Subject /></Protected>} />
          <Route path="/settings" element={<Protected><Settings /></Protected>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
