import { describe, expect, it } from "vitest"
import { Product } from "../Product"
import { mockProduct } from "../../../shared/mocks/mockProduct"

describe("Product", () => {
  it("should create a product", () => {
    const product = Product.create(mockProduct)

    expect(product.title).toBe("Product 1")
    expect(product.price).toBe(10)
  })

  it("throw an error when the title is invalid", () => {
    expect(() => Product.create({ ...mockProduct, title: " " })).toThrow(
      "Invalid title"
    )
  })

  it("thown an error when the price is <= 0", () => {
    expect(() => Product.create({ ...mockProduct, price: 0 })).toThrow(
      "Invalid price"
    )
  })

  it("update mantains immutability", () => {
    const product = Product.create(mockProduct)
    expect(() => product.update({ price: -5 })).toThrow("Invalid price")
  })
})
