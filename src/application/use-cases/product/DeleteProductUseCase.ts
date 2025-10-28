import type { Result } from '../../../shared/Result'
import type { ProductRepository } from '../../ports/ProductRepository'
import { err, ok } from '../../../shared/Result'

export type DeleteProductResponse = Result<void>

export class DeleteProductUseCase {
  private readonly productRepository: ProductRepository

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  async execute(id: number): Promise<DeleteProductResponse> {
    try {
      await this.productRepository.delete(id)
      return ok(undefined)
    }
    catch (error) {
      return err(error instanceof Error ? error : new Error('Failed to delete product'))
    }
  }
}
