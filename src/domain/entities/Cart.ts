import type { CartItem } from "./CartItem"

export class Cart {
  private readonly items: Map<number, CartItem>

  private constructor(items: Map<number, CartItem>) {
    this.items = new Map(items)
  }

  static empty(): Cart {
    return new Cart(new Map())
  }

  static fromItems(items: CartItem[]): Cart {
    const map = new Map<number, CartItem>()
    items.forEach((item) => {
      map.set(item.productId, item)
    })
    return new Cart(map)
  }

  addItem(newItem: CartItem): Cart {
    const next = new Map(this.items)
    const existing = next.get(newItem.productId)

    if (existing) {
      next.set(newItem.productId, existing.increase(newItem.totalQuantity))
    } else {
      next.set(newItem.productId, newItem)
    }
    return new Cart(next)
  }

  updateQuantity(productId: number, quantity: number): Cart {
    const next = new Map(this.items)
    const current = next.get(productId)

    if (!current) {
      return this
    }
    next.set(productId, current.updateQuantity(quantity))
    return new Cart(next)
  }

  removeItem(productId: number): Cart {
    const next = new Map(this.items)
    next.delete(productId)
    return new Cart(next)
  }

  clear(): Cart {
    return Cart.empty()
  }

  get allItems(): CartItem[] {
    return Array.from(this.items.values())
  }

  get totalItems(): number {
    let count = 0
    for (const item of this.items.values()) {
      count += item.totalQuantity
    }
    return count
  }

  get totalAmount(): number {
    let total = 0
    for (const item of this.items.values()) {
      total += item.subtotal
    }
    return total
  }

  hasItem(productId: number): boolean {
    return this.items.has(productId)
  }
}
