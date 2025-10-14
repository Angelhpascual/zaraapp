import { Product } from "../../domain/entities/Product"
import { err, ok, type Result } from "../../shared/Result"
import type { CreateProductDTO } from "../DTOs/ProductDTOs/CreateProductDTO"
import type { ProductRepository } from "../ports/ProductRepository"

export type CreateProductResponse = Result<void>

export class CreateProductUseCase {
  private readonly productRepository: ProductRepository

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  async execute(input: CreateProductDTO): Promise<CreateProductResponse> {
    try {
      const product = Product.create(input)
      await this.productRepository.create(product)
      return ok(undefined)
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)))
    }
  }
}
