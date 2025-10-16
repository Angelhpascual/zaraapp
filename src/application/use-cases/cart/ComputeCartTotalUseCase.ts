import type { Result } from '../../../shared/Result'
import type { CartTotalDTO } from '../../DTOs/CartDTOs/CartTotalDTO'
import type { CartRepository } from '../../ports/CartRepository'
import { err, ok } from '../../../shared/Result'

export type ComputeCartTotalUseCaseResponse = Result<CartTotalDTO>

export class ComputeCartTotalUseCase {
  private readonly cartRepository: CartRepository

  constructor(cartRepository: CartRepository) {
    this.cartRepository = cartRepository
  }

  async execute(): Promise<ComputeCartTotalUseCaseResponse> {
    try {
      const cart = await this.cartRepository.get()

      return ok({ totalItems: cart.totalItems, totalAmount: cart.totalAmount })
    }
    catch (error) {
      return err(error instanceof Error ? error : new Error('Failed to compute cart total'))
    }
  }
}
