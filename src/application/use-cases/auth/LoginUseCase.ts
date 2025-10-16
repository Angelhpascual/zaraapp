import type { Result } from '../../../shared/Result'
import type { LoginCredentialsDTO } from '../../DTOs/AuthDTOs/LoginCredentialsDTO'
import type { SessionDTO } from '../../DTOs/AuthDTOs/SessionDTO'
import type { AuthRepository } from '../../ports/AuthRepository'
import { err, ok } from '../../../shared/Result'

export type LoginUseCaseResponse = Result<SessionDTO>

export class LoginUseCase {
  private readonly authRepository: AuthRepository

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async execute(credentials: LoginCredentialsDTO): Promise<LoginUseCaseResponse> {
    try {
      const session = await this.authRepository.login(credentials.username, credentials.password)

      const dto: SessionDTO = {
        token: session.token,
        username: session.username,
        role: session.role,
      }

      return ok(dto)
    }
    catch (error) {
      return err(error instanceof Error ? error : new Error('Login failed'))
    }
  }
}
