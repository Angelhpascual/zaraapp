import { describe, expect, it } from 'vitest'
import { Session } from '../../../../domain/entities/Session'
import { AuthRepositoryMock } from '../../../../shared/AuthRepositoryMock'
import { LogoutUseCase } from '../LogoutUseCase'

describe('logoutUseCase', () => {
  it('should log out a user successfully', async () => {
    const repository = new AuthRepositoryMock(async (username) => {
      return Session.create({ token: 'token-123', username, role: 'admin' })
    })  

    await repository.login('user', 'pass')

    const useCase = new LogoutUseCase(repository)
    const result = await useCase.execute()

    expect(result.ok).toBe(true)
    const session = await repository.getSession()
    expect(session).toBeNull()
  })
})
