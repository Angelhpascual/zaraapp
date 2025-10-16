import type { Result } from '../../../shared/Result'
import type { CartRepository } from '../../ports/CartRepository'
import { err, ok } from '../../../shared/Result'

export type RemoveItemFromCartUseCaseResponse = Result<void>

export class RemoveItemFromCartUseCase {
  private readonly cartRepository: CartRepository

  constructor(
    cartRepository: CartRepository,
  ) {
    this.cartRepository = cartRepository
  }

  async execute(productId: number): Promise<RemoveItemFromCartUseCaseResponse> {
    try {
      const cart = await this.cartRepository.get()
      if (!cart.hasItem(productId)) {
        return err(new Error('Item not found in cart'))
      }

      const updatedCart = cart.removeItem(productId)
      await this.cartRepository.save(updatedCart)

      return ok(undefined)
    }
    catch (error) {
      return err(error instanceof Error ? error : new Error('Failed to remove item from cart'))
    }
  }
}
