import { describe, expect, it } from 'vitest'
import { Product } from '../../../../domain/entities/Product'
import { ProductRepositoryMock } from '../../../../shared/ProductRepositoryMock'
import { AddItemToCartUseCase } from '../AddItemToCartUseCase'
import { RemoveItemFromCartUseCase } from '../RemoveItemFromCartUseCase'
import { CartRepositoryMock } from './mocks/CartRepositoryMock'

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

describe('removeItemFromCartUseCase', () => {
  it('removes an item from a cart', async () => {
    const cartRepository = new CartRepositoryMock()
    const productRepository = new ProductRepositoryMock([baseProduct])

    await new AddItemToCartUseCase(cartRepository, productRepository).execute({ productId: 1, quantity: 2 })

    const useCase = new RemoveItemFromCartUseCase(cartRepository)
    const result = await useCase.execute(1)

    expect(result.ok).toBe(true)
    const cart = await cartRepository.get()
    expect(cart.totalItems).toBe(0)
    expect(cart.hasItem(1)).toBe(false)
  })
})
