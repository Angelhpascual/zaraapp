import { describe, expect, it } from 'vitest'
import { Product } from '../../../../domain/entities/Product'
import { ProductRepositoryMock } from '../../../../shared/ProductRepositoryMock'
import { AddItemToCartUseCase } from '../AddItemToCartUseCase'
import { ClearCartUseCase } from '../ClearCartUseCase'
import { CartRepositoryMock } from './mocks/CartRepositoryMock'

const product = Product.create({
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

describe('clearCartUseCase', () => {
  it('clears all items from the cart', async () => {
    const cartRepository = new CartRepositoryMock()
    const productRepository = new ProductRepositoryMock([product])

    await new AddItemToCartUseCase(cartRepository, productRepository).execute({ productId: 1, quantity: 2 })

    const useCase = new ClearCartUseCase(cartRepository)
    const result = await useCase.execute()

    expect(result.ok).toBe(true)
    const cart = await cartRepository.get()
    expect(cart.totalAmount).toBe(0)
    expect(cart.totalItems).toBe(0)
  })
})
