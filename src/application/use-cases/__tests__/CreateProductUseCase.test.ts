import { describe, expect, it } from "vitest"
import { ProductRepositoryMock } from "../../../shared/ProductRepositoryMock"
import { CreateProductUseCase } from "../CreateProductUseCase"

const input = {
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

describe("CreateProductUseCase", () => {
  it("persist a valid product", async () => {
    const repository = new ProductRepositoryMock()
    const useCase = new CreateProductUseCase(repository)

    const result = await useCase.execute(input)

    expect(result.ok).toBe(true)
    expect((await repository.findAll()).length).toBe(1)
  })
  it("return error for invalid product", async () => {
    const repository = new ProductRepositoryMock()
    const useCase = new CreateProductUseCase(repository)

    const result = await useCase.execute({ ...input, price: -1 })

    expect(result.ok).toBe(false)
    expect((await repository.findAll()).length).toBe(0)
  })
})
