import type { Result } from '../../../shared/Result'
import type { SessionDTO } from '../../DTOs/AuthDTOs/SessionDTO'
import type { AuthRepository } from '../../ports/AuthRepository'
import { err, ok } from '../../../shared/Result'

export type GetSessionUseCaseResponse = Result<SessionDTO | null>

export class GetSessionUseCase {
  private readonly authRepository: AuthRepository

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async execute(): Promise<GetSessionUseCaseResponse> {
    try {
      const session = await this.authRepository.getSession()

      if (!session) {
        return ok(null)
      }

      return ok({
        token: session.token,
        username: session.username,
        role: session.role,
      })
    }
    catch (error) {
      return err(
        error instanceof Error ? error : new Error('Failed to get session'),
      )
    }
  }
}
