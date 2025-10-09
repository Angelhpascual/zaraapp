import { describe, expect, it } from "vitest"
import { Product } from "../Product"
import { CartItem } from "../CartItem"
import { mockProduct } from "../../../shared/mocks/mockProduct"

const product = Product.create(mockProduct)

describe("CartItem", () => {
  it("should create a cart item", () => {
    const cartItem = CartItem.create({ product, quantity: 2 })

    expect(cartItem.productId).toBe(1)
    expect(cartItem.totalQuantity).toBe(2)
    expect(cartItem.subtotal).toBe(20)
  })
  it("throw an error when the quantity is <=0", () => {
    expect(() => CartItem.create({ product, quantity: 0 })).toThrow(
      "Invalid quantity"
    )
  })
  it("increase the quantity", () => {
    const cartItem = CartItem.create({ product, quantity: 2 })
    const updated = cartItem.increase(3)

    expect(updated.totalQuantity).toBe(5)
  })
  it("throw an error when in the increase function the amount is invalid", () => {
    const cartItem = CartItem.create({ product, quantity: 2 })
    expect(() => cartItem.increase(0)).toThrow("Invalid amount")
  })

  it("update the quantity", () => {
    const cartItem = CartItem.create({ product, quantity: 2 })
    const updated = cartItem.updateQuantity(5)

    expect(updated.totalQuantity).toBe(5)
  })
  it("updateQuantity mantains immutability", () => {
    const cartItem = CartItem.create({ product, quantity: 2 })
    const updated = cartItem.updateQuantity(5)

    expect(cartItem.totalQuantity).toBe(2)
    expect(updated.totalQuantity).toBe(5)
  })

  it("updateQuantity throw an error when <=0", () => {
    const cartItem = CartItem.create({ product, quantity: 2 })
    expect(() => cartItem.updateQuantity(0)).toThrow("Invalid quantity")
  })

  it("subtotal is correct", () => {
    const cartItem = CartItem.create({ product, quantity: 2 })

    expect(cartItem.subtotal).toBe(20)
  })
})
