import { describe, expect, it } from 'vitest'
import { Session } from '../../../../domain/entities/Session'
import { AuthRepositoryMock } from '../../../../shared/AuthRepositoryMock'
import { LoginUseCase } from '../LoginUseCase'

const credentials = { username: 'admin', password: 'password123' }

describe('loginUseCase', async () => {
  it('should log in a user with valid credentials', async () => {
    const repository = new AuthRepositoryMock(async (username) => {
      return Session.create({ token: 'token-123', username, role: 'admin' })
    })
    const useCase = new LoginUseCase(repository)
    const result = await useCase.execute(credentials)

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value).toEqual({
        token: 'token-123',
        username: 'admin',
        role: 'admin',
      })
    }
  })
  it('should return an error if the credentials are invalid', async () => {
    const repository = new AuthRepositoryMock(async () => {
      throw new Error('Invalid credentials')
    })
    const useCase = new LoginUseCase(repository)
    const result = await useCase.execute(credentials)

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.message).toBe('Invalid credentials')
    }
  })
})
