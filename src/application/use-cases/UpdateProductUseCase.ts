import type { Product } from "../../domain/entities/Product"
import { err, ok, type Result } from "../../shared/Result"
import type { UpdateProductDTO } from "../DTOs/ProductDTOs/UpdateProductDTO"
import type { ProductRepository } from "../ports/ProductRepository"

export type UpdateProductResponse = Result<void>

export class UpdateProductUseCase {
  private readonly productRepository: ProductRepository

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  async execute(input: UpdateProductDTO): Promise<UpdateProductResponse> {
    try {
      const existing = await this.productRepository.findById(input.id)
      if (!existing) {
        return err(new Error("Product not found"))
      }
      const updated = existing.update(input)
      await this.productRepository.update(updated)
      return ok(undefined)
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)))
    }
  }
}
