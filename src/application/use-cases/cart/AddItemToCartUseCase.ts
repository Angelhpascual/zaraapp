import type { Result } from '../../../shared/Result'
import type { CartItemDTO } from '../../DTOs/CartDTOs/CartItemDTO'
import type { CartRepository } from '../../ports/CartRepository'
import type { ProductRepository } from '../../ports/ProductRepository'
import { CartItem } from '../../../domain/entities/CartItem'
import { err, ok } from '../../../shared/Result'

export type AddItemToCartResponse = Result<void>

export class AddItemToCartUseCase {
  private readonly cartRepository: CartRepository
  private readonly productRepository: ProductRepository

  constructor(
    cartRepository: CartRepository,
    productRepository: ProductRepository,
  ) {
    this.cartRepository = cartRepository
    this.productRepository = productRepository
  }

  async execute(input: CartItemDTO): Promise<AddItemToCartResponse> {
    try {
      const cart = await this.cartRepository.get()
      const product = await this.productRepository.findById(input.productId)

      if (!product) {
        return err(new Error('Product not found'))
      }

      const item = CartItem.create({ product, quantity: input.quantity })
      const updateCart = cart.addItem(item)
      await this.cartRepository.save(updateCart)
      return ok(undefined)
    }
    catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)))
    }
  }
}
