import type { SessionDTO } from '../../application/DTOs/AuthDTOs/SessionDTO'
import { create } from 'zustand'
import { getSessionUseCase, loginUseCase, logoutUseCase } from '../../application'

interface AuthState {
  session: SessionDTO | null
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  loadSession: () => Promise<void>
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState & AuthActions>(set => ({
  session: null,
  isLoading: false,
  error: null,

  loadSession: async () => {
    const result = await getSessionUseCase.execute()

    if (result.ok) {
      set({ session: result.value })
    }
    else {
      set({ error: result.error.message })
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, error: null })
    const result = await loginUseCase.execute({ username, password })

    if (result.ok) {
      set({ session: result.value, isLoading: false })
    }
    else {
      set({ error: result.error.message, isLoading: false })
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null })
    const result = await logoutUseCase.execute()
    if (result.ok) {
      set({ session: null, isLoading: false })
    }
    else {
      set({ error: result.error.message, isLoading: false })
    }
  },
}),
)
