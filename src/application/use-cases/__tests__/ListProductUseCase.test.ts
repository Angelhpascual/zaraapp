import { describe, expect, it } from "vitest"
import { Product } from "../../../domain/entities/Product"
import { ProductRepositoryMock } from "../../../shared/ProductRepositoryMock"
import { ListProductUseCase } from "../ListProductUseCase"
import type { ProductRepository } from "../../ports/ProductRepository"

const baseProduct = {
  id: 1,
  title: "T-Shirt",
  price: 19.99,
  description: "Cottom",
  category: "men's clothing",
  image: "image.jpg",
  rating: {
    rate: 4.5,
    count: 100,
  },
}

describe("ListProductUseCase", () => {
  it("returns products mapped to DTOs", async () => {
    const product = Product.create(baseProduct)
    const repository = new ProductRepositoryMock([product])
    const useCase = new ListProductUseCase(repository)

    const result = await useCase.execute()

    expect(result.ok).toBe(true)

    if (result.ok) {
      expect(result.value).toHaveLength(1)
      expect(result.value[0].title).toBe("T-Shirt")
      expect(result.value[0].price).toBe(19.99)
    }
  })
  it("bubbles repository errors", async () => {
    const failingRepository: ProductRepository = {
      findAll: () => Promise.reject(new Error("db error")),
      findById: async () => null,
      create: async () => undefined,
      update: async () => undefined,
      delete: async () => undefined,
    }

    const useCase = new ListProductUseCase(
      failingRepository as unknown as ProductRepositoryMock
    )

    const result = await useCase.execute()

    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error.message).toBe("db error")
  })
})
