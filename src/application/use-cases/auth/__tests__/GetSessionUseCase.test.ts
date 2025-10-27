import { describe, expect, it } from 'vitest'
import { Session } from '../../../../domain/entities/Session'
import { AuthRepositoryMock } from '../../../../shared/AuthRepositoryMock'
import { GetSessionUseCase } from '../GetSessionUseCase'

function createSession(overrides: Partial<{ token: string, username: string, role: 'admin' | 'user' }> = {}) {
  return Session.create({
    token: 'token-123',
    username: 'admin',
    role: 'admin',
    ...overrides,
  })
}

describe('getSessionUseCase', () => {
  it('returns a SessionDTO when a session exists', async () => {
    const repository = new AuthRepositoryMock(async (username) => {
      return Session.create({ token: 'token-123', username, role: 'admin' })
    })

    await repository.login('admin', 'secret')
    const useCase = new GetSessionUseCase(repository)
    const result = await useCase.execute()

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value).toEqual({
        token: 'token-123',
        username: 'admin',
        role: 'admin',
      })
    }
  })
  it('returns null when there is no stored session', async () => {
    const repository = new AuthRepositoryMock(async () => createSession())
    const useCase = new GetSessionUseCase(repository)

    const result = await useCase.execute()

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value).toBeNull()
    }
  })
  it('returns error when repository throws', async () => {
    const repository = {
      async login() {
        return createSession()
      },
      async logout() { },
      async getSession() {
        throw new Error('storage failure')
      },
    }

    const useCase = new GetSessionUseCase(repository)
    const result = await useCase.execute()

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.message).toBe('storage failure')
    }
  })
})
