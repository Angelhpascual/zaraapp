import { Product } from "../../domain/entities/Product"

export interface ProductRepository {
  findAll(): Promise<Product[]>
  findById(id: string): Promise<Product | null>
  create(product: Product): Promise<void>
  update(product: Product): Promise<void>
  delete(id: string): Promise<void>
}
