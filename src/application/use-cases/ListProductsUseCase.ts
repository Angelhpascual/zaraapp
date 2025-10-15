import type { Product } from "../../domain/entities/Product"
import { err, ok, type Result } from "../../shared/Result"
import type { CreateProductDTO } from "../DTOs/ProductDTOs/CreateProductDTO"
import type { ProductRepository } from "../ports/ProductRepository"

export type ListProductResponse = Result<CreateProductDTO[]>

export class ListProductUseCase {
  private readonly productRepository: ProductRepository

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  async execute(): Promise<ListProductResponse> {
    try {
      const products = await this.productRepository.findAll()
      return ok(products.map(this.toDTO))
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)))
    }
  }

  private toDTO(product: Product): CreateProductDTO {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: {
        rate: product.rating.rate,
        count: product.rating.count,
      },
    }
  }
}
