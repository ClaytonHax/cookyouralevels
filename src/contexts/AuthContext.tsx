import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth, firebaseEnabled } from '../lib/firebase'
import { setIdentity } from '../lib/userStore'
import AuthModal from '../components/AuthModal'

/** The signed-in user or the guest. `uid` is 'guest' for guests. */
export interface AppUser {
  uid: string
  isGuest: boolean
  displayName: string | null
  email: string | null
  photoURL: string | null
}

export interface AuthContextType {
  /** null = signed out. Guests are users with isGuest = true. */
  user: AppUser | null
  /** True until the initial auth state is known. */
  loading: boolean
  isGuest: boolean
  /** False when Firebase env vars are missing: guest mode only. */
  firebaseEnabled: boolean
  authOpen: boolean
  openAuth: () => void
  closeAuth: () => void
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  /** Start a local-only session (data stays in this browser). */
  continueAsGuest: () => void
  /** Clears the guest flag / signs out of Firebase. Guest data is kept on the device. */
  signOut: () => Promise<void>
}

const GUEST_KEY = 'cyal.guest'
const GUEST: AppUser = { uid: 'guest', isGuest: true, displayName: 'Guest', email: null, photoURL: null }

function guestFlag(): boolean {
  try { return localStorage.getItem(GUEST_KEY) === '1' } catch { return false }
}
function setGuestFlag(on: boolean) {
  try { on ? localStorage.setItem(GUEST_KEY, '1') : localStorage.removeItem(GUEST_KEY) } catch { /* ignore */ }
}
function fromFirebase(u: User): AppUser {
  return { uid: u.uid, isGuest: false, displayName: u.displayName, email: u.email, photoURL: u.photoURL }
}
function publish(u: AppUser | null): AppUser | null {
  setIdentity(u ? { uid: u.uid, guest: u.isGuest } : null)
  return u
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(() => (!firebaseEnabled && guestFlag() ? publish(GUEST) : null))
  const [loading, setLoading] = useState(firebaseEnabled)
  const [authOpen, setAuthOpen] = useState(false)

  useEffect(() => {
    if (!auth) { setLoading(false); return }
    return onAuthStateChanged(auth, (fb) => {
      if (fb) { setGuestFlag(false); setUser(publish(fromFirebase(fb))) }
      else setUser(publish(guestFlag() ? GUEST : null))
      setLoading(false)
    })
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    if (!auth) throw Object.assign(new Error('Accounts are not available'), { code: 'auth/unavailable' })
    await signInWithEmailAndPassword(auth, email, password)
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    if (!auth) throw Object.assign(new Error('Accounts are not available'), { code: 'auth/unavailable' })
    await createUserWithEmailAndPassword(auth, email, password)
  }, [])

  const continueAsGuest = useCallback(() => {
    setGuestFlag(true)
    setUser(publish(GUEST))
    setAuthOpen(false)
  }, [])

  const signOut = useCallback(async () => {
    setGuestFlag(false)
    if (auth && auth.currentUser) await firebaseSignOut(auth) // onAuthStateChanged updates the user
    else setUser(publish(null))
  }, [])

  const value = useMemo<AuthContextType>(() => ({
    user, loading, isGuest: !!user?.isGuest, firebaseEnabled, authOpen,
    openAuth: () => setAuthOpen(true), closeAuth: () => setAuthOpen(false),
    signIn, signUp, continueAsGuest, signOut,
  }), [user, loading, authOpen, signIn, signUp, continueAsGuest, signOut])

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal />
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
