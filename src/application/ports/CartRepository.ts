import type { Cart } from "../../domain/entities/Cart"

export interface CartRepository {
  get(): Promise<Cart>
  save(cart: Cart): Promise<void>
  clear(): Promise<void>
}
