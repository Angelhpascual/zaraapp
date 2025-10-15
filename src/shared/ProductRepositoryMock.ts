import type { ProductRepository } from '../application/ports/ProductRepository'
import type { Product } from '../domain/entities/Product'

export class ProductRepositoryMock implements ProductRepository {
  private items = new Map<number, Product>()

  constructor(initialProducts: Product[] = []) {
    initialProducts.forEach((product) => {
      this.items.set(product.id, product)
    })
  }

  async findAll(): Promise<Product[]> {
    return Array.from(this.items.values())
  }

  async findById(id: number): Promise<Product | null> {
    return this.items.get(id) ?? null
  }

  async create(product: Product): Promise<void> {
    this.items.set(product.id, product)
  }

  async update(product: Product): Promise<void> {
    this.items.set(product.id, product)
  }

  async delete(id: number): Promise<void> {
    this.items.delete(id)
  }
}
