import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

/** Landing CTAs: open the auth modal, or jump in as a guest. */
export function useStart() {
  const { openAuth, continueAsGuest } = useAuth()
  const navigate = useNavigate()
  return {
    openAuth,
    tryAsGuest: () => {
      continueAsGuest()
      navigate('/onboarding')
    },
  }
}
