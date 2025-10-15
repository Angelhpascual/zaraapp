import type { Result } from '../../../shared/Result'
import type { CartRepository } from '../../ports/CartRepository'

import { err, ok } from '../../../shared/Result'

export type UpdateCartItemResponse = Result<void>

export class UpdateCartItemUseCase {
  private readonly cartRepository: CartRepository

  constructor(
    cartRepository: CartRepository,
  ) {
    this.cartRepository = cartRepository
  }

  async execute(productId: number, quantity: number): Promise<UpdateCartItemResponse> {
    try {
      const cart = await this.cartRepository.get()
      if (!cart.hasItem(productId)) {
        return err(new Error('Item not found in cart'))
      }

      const updatedCart = cart.updateQuantity(productId, quantity)
      await this.cartRepository.save(updatedCart)
      return ok(undefined)
    }
    catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)))
    }
  }
}
