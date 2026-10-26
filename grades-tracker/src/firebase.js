import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Without real keys the app runs in on-device demo mode instead of crashing
export const firebaseReady = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && !firebaseConfig.apiKey.startsWith('your-')
)

export const app = firebaseReady ? initializeApp(firebaseConfig) : null
export const auth = firebaseReady ? getAuth(app) : null
export const db = firebaseReady ? getFirestore(app) : null
