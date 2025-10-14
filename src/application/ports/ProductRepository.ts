import { Product } from "../../domain/entities/Product"

export interface ProductRepository {
  findAll(): Promise<Product[]>
  findById(id: number): Promise<Product | null>
  create(product: Product): Promise<void>
  update(product: Product): Promise<void>
  delete(id: number): Promise<void>
}
