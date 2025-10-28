import type { CartRepository } from '../../application/ports/CartRepository'
import { Cart } from '../../domain/entities/Cart'
import { CartItem } from '../../domain/entities/CartItem'
import { Product } from '../../domain/entities/Product'

const STORAGE_KEY = 'zaraapp:cart'

interface StoredCartItem {
  product: {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
      rate: number
      count: number
    }
  }
  quantity: number
}

export class CartLocalRepository implements CartRepository {
  private cart: Cart
  private readonly storage: Storage | null

  constructor(storage?: Storage | null) {
    this.storage = storage ?? (typeof window !== 'undefined' ? window.localStorage : null)
    this.cart = this.loadFromStorage()
  }

  async get(): Promise<Cart> {
    return this.cart
  }

  async save(cart: Cart): Promise<void> {
    this.cart = cart
    this.persistToStorage(cart)
  }

  async clear(): Promise<void> {
    this.cart = Cart.empty()
    this.persistToStorage(this.cart)
  }

  private loadFromStorage(): Cart {
    if (!this.storage) return Cart.empty()

    const raw = this.storage.getItem(STORAGE_KEY)
    if (!raw) return Cart.empty()

    try {
      const parsed = JSON.parse(raw) as StoredCartItem[]
      const items = parsed.map((item) =>
        CartItem.create({
          product: Product.create(item.product),
          quantity: item.quantity,
        }),
      )

      return Cart.fromItems(items)
    }
    catch (error) {
      console.warn('[CartLocalRepository] invalid stored cart, resetting.', error)
      this.storage.removeItem(STORAGE_KEY)
      return Cart.empty()
    }
  }

  private persistToStorage(cart: Cart) {
    if (!this.storage) return

    if (cart.totalItems === 0) {
      this.storage.removeItem(STORAGE_KEY)
      return
    }

    const payload: StoredCartItem[] = cart.allItems.map((item) => ({
      product: {
        id: item.productId,
        title: item.productTitle,
        price: item.productPrice,
        description: item.productDescription,
        category: item.productCategory,
        image: item.productImage,
        rating: item.productRating,
      },
      quantity: item.totalQuantity,
    }))

    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(payload))
    }
    catch (error) {
      console.warn('[CartLocalRepository] failed to persist cart', error)
    }
  }
}
