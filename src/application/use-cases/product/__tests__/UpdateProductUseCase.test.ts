import { describe, expect, it } from 'vitest'
import { Product } from '../../../../domain/entities/Product'
import { ProductRepositoryMock } from '../../../../shared/ProductRepositoryMock'
import { UpdateProductUseCase } from '../UpdateProductUseCase'

const baseProduct = Product.create({
  id: 1,
  title: 'T-Shirt',
  price: 19.99,
  description: 'Cottom',
  category: 'men\'s clothing',
  image: 'image.jpg',
  rating: {
    rate: 4.5,
    count: 100,
  },
})

describe('updateProductUseCase', () => {
  it('updates existing product', async () => {
    const repository = new ProductRepositoryMock([baseProduct])
    const useCase = new UpdateProductUseCase(repository)

    const result = await useCase.execute({ id: 1, price: 25.99 })

    expect(result.ok).toBe(true)
    const stored = await repository.findById(1)
    expect(stored?.price).toBe(25.99)
  })
})
