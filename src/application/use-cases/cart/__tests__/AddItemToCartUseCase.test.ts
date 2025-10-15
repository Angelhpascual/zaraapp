import { describe, expect, it } from 'vitest'
import { Product } from '../../../../domain/entities/Product'
import { ProductRepositoryMock } from '../../../../shared/ProductRepositoryMock'
import { AddItemToCartUseCase } from '../AddItemToCartUseCase'
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
},
)

describe('addItemToCart', () => {
  it('adds a new item to the cart', async () => {
    const cartRepository = new CartRepositoryMock()
    const productRepository = new ProductRepositoryMock([baseProduct])
    const useCase = new AddItemToCartUseCase(cartRepository, productRepository)

    const result = await useCase.execute({ productId: 1, quantity: 2 })

    expect(result.ok).toBe(true)
    const cart = await cartRepository.get()
    expect(cart.totalItems).toBe(2)
  })
  it('fails when product doesn\'t exist', async () => {
    const useCase = new AddItemToCartUseCase(
      new CartRepositoryMock(),
      new ProductRepositoryMock(),
    )

    const result = await useCase.execute({ productId: 999, quantity: 2 })

    expect(result.ok).toBe(false)
    if (!result.ok)
      expect(result.error.message).toBe('Product not found')
  })
})
