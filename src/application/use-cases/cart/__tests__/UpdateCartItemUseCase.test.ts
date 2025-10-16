import { describe, expect, it } from 'vitest'
import { Product } from '../../../../domain/entities/Product'
import { ProductRepositoryMock } from '../../../../shared/ProductRepositoryMock'
import { AddItemToCartUseCase } from '../AddItemToCartUseCase'
import { UpdateCartItemUseCase } from '../UpdateCartItemUseCase'
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

describe('updateCartItemUseCase', () => {
  it('update the quantity of an existing cart item', async () => {
    const cartRepository = new CartRepositoryMock()
    const productRepository = new ProductRepositoryMock([baseProduct])

    const addResult = await new AddItemToCartUseCase(cartRepository, productRepository).execute({ productId: 1, quantity: 2 })

    expect(addResult.ok).toBe(true)
    if (!addResult.ok)
      throw new Error('Failed to add item to cart for setup')

    const useCase = new UpdateCartItemUseCase(cartRepository)

    const result = await useCase.execute(1, 5)

    expect(result.ok).toBe(true)
    const cart = await cartRepository.get()
    expect(cart.totalItems).toBe(5)
  })
  it('return an error when the item is not in the cart', async () => {
    const cartRepository = new CartRepositoryMock()
    const useCase = new UpdateCartItemUseCase(cartRepository)

    const result = await useCase.execute(999, 5)

    expect(result.ok).toBe(false)
    if (!result.ok)
      expect(result.error.message).toBe('Item not found in cart')
  })
})
