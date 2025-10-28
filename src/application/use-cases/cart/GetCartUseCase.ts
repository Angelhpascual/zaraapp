import type { Cart } from '../../../domain/entities/Cart'
import type { CartItem } from '../../../domain/entities/CartItem'
import type { Result } from '../../../shared/Result'
import type { CartDTO } from '../../DTOs/CartDTOs/CartDTO'
import type { CartItemDTO } from '../../DTOs/CartDTOs/CartItemDTO'
import type { CartTotalDTO } from '../../DTOs/CartDTOs/CartTotalDTO'
import type { CartRepository } from '../../ports/CartRepository'
import { err, ok } from '../../../shared/Result'

export type GetCartResponse = Result<CartDTO>

export class GetCartUseCase {
  private readonly cartRepository: CartRepository

  constructor(cartRepository: CartRepository) {
    this.cartRepository = cartRepository
  }

  async execute(): Promise<GetCartResponse> {
    try {
      const cart = await this.cartRepository.get()
      return ok(this.toDTO(cart))
    }
    catch (error) {
      return err(error instanceof Error ? error : new Error('Failed to load cart'))
    }
  }

  private toDTO(cart: Cart): CartDTO {
    const items: CartItemDTO[] = cart.allItems.map((item: CartItem) => ({
      productId: item.productId,
      title: item.productTitle,
      price: item.productPrice,
      image: item.productImage,
      quantity: item.totalQuantity,
      subtotal: item.subtotal,
    }))

    const totals: CartTotalDTO = {
      totalItems: cart.totalItems,
      totalAmount: cart.totalAmount,
    }

    return { items, totals }
  }
}
