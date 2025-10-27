import type { ProductRepository } from '../../application/ports/ProductRepository'
import { Product } from '../../domain/entities/Product'
import { httpClient } from './client'

const BASE_URL = 'https://fakestoreapi.com/products'

interface ProductApiResponse {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export class ProductHttpRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    const data = await httpClient.get<ProductApiResponse[]>(BASE_URL)
    return data.map(this.toEntity)
  }

  async findById(id: number): Promise<Product | null> {
    const data = await httpClient.get<ProductApiResponse>(`${BASE_URL}/${id}`)
    return this.toEntity(data)
  }

  async create(product: Product): Promise<void> {
    await httpClient.post<ProductApiResponse>(BASE_URL, this.toPayload(product))
  }

  async update(product: Product): Promise<void> {
    await httpClient.put<ProductApiResponse>(`${BASE_URL}/${product.id}`, this.toPayload(product))
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete<void>(`${BASE_URL}/${id}`)
  }

  private toEntity(apiProduct: ProductApiResponse): Product {
    return Product.create(apiProduct)
  }

  private toPayload(product: Product): ProductApiResponse {
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
