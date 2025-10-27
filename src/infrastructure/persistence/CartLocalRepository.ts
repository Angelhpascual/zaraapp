import type { CartRepository } from '../../application/ports/CartRepository'
import { Cart } from '../../domain/entities/Cart'

export class CartLocalRepository implements CartRepository {
  private cart: Cart = Cart.empty()

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
