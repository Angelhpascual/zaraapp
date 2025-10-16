import type { Result } from '../../../shared/Result'
import type { AuthRepository } from '../../ports/AuthRepository'
import { err, ok } from '../../../shared/Result'

export type LogoutResponse = Result<void>

export class LogoutUseCase {
  private readonly authRepository: AuthRepository

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async execute(): Promise<LogoutResponse> {
    try {
      await this.authRepository.logout()

      return ok(undefined)
    }
    catch (error) {
      return err(error instanceof Error ? error : new Error('Logout failed'))
    }
  }
}
