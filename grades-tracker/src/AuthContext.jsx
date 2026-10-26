import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { auth, firebaseReady } from './firebase'

const AuthContext = createContext(null)
const LOCAL_USER_KEY = 'zishao-local-user'

function readLocalUser() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USER_KEY))
  } catch {
    return null
  }
}

function writeLocalUser(u) {
  try {
    if (u) localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(u))
    else localStorage.removeItem(LOCAL_USER_KEY)
  } catch {
    // ignore — demo still works for this session
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(firebaseReady ? null : readLocalUser())
  const [loading, setLoading] = useState(firebaseReady)

  useEffect(() => {
    if (!firebaseReady) return
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  function startLocal(email, name) {
    const prev = readLocalUser()
    const u = {
      uid: 'local',
      email,
      displayName: name || prev?.displayName || email.split('@')[0],
      metadata: { creationTime: prev?.metadata?.creationTime || new Date().toUTCString() },
    }
    writeLocalUser(u)
    setUser(u)
    return Promise.resolve(u)
  }

  const value = firebaseReady
    ? {
        user,
        loading,
        demo: false,
        signup: (email, password, name) =>
          createUserWithEmailAndPassword(auth, email, password).then((cred) =>
            updateProfile(cred.user, { displayName: name })
          ),
        login: (email, password) => signInWithEmailAndPassword(auth, email, password),
        logout: () => signOut(auth),
      }
    : {
        user,
        loading,
        demo: true,
        signup: (email, _password, name) => startLocal(email, name),
        login: (email) => startLocal(email),
        logout: () => {
          writeLocalUser(null)
          setUser(null)
          return Promise.resolve()
        },
      }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
