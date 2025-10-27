import { useEffect } from 'react'
import { useAuthStore } from '../store/auth.store'

export function useAuth() {
  const session = useAuthStore(state => state.session)
  const isLoading = useAuthStore(state => state.isLoading)
  const error = useAuthStore(state => state.error)
  const loadSession = useAuthStore(state => state.loadSession)
  const login = useAuthStore(state => state.login)
  const logout = useAuthStore(state => state.logout)

  useEffect(() => {
    void loadSession()
  }, [loadSession])

  return { session, isLoading, error, login, logout }
}
