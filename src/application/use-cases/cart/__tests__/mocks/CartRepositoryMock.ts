import type { CartRepository } from '../../../../ports/CartRepository'
import { Cart } from '../../../../../domain/entities/Cart'

export class CartRepositoryMock implements CartRepository {
  private cart: Cart

  constructor(initialCart?: Cart) {
    this.cart = initialCart ?? Cart.empty()
  }

  async get(): Promise<Cart> {
    return this.cart
  }

  async save(cart: Cart): Promise<void> {
    this.cart = cart
  }

  async clear(): Promise<void> {
    this.cart = Cart.empty()
  }
}
