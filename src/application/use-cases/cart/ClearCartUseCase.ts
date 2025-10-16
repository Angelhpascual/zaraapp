import type { Result } from '../../../shared/Result'
import type { CartRepository } from '../../ports/CartRepository'
import { err, ok } from '../../../shared/Result'

export type ClearCartUseCaseResponse = Result<void>

export class ClearCartUseCase {
  private readonly cartRepository: CartRepository

  constructor(
    cartRepository: CartRepository,
  ) {
    this.cartRepository = cartRepository
  }

  async execute(): Promise<ClearCartUseCaseResponse> {
    try {
      await this.cartRepository.clear()
      return ok(undefined)
    }
    catch (error) {
      return err(error instanceof Error ? error : new Error('Failed to clear cart'))
    }
  }
}
