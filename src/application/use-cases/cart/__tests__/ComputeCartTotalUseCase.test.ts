import { describe, expect, it } from 'vitest'
import { Product } from '../../../../domain/entities/Product'
import { ProductRepositoryMock } from '../../../../shared/ProductRepositoryMock'
import { AddItemToCartUseCase } from '../AddItemToCartUseCase'
import { ComputeCartTotalUseCase } from '../ComputeCartTotalUseCase'
import { CartRepositoryMock } from './mocks/CartRepositoryMock'

const capProduct = Product.create(({
  id: 1,
  title: 'Cap',
  price: 15,
  description: 'A nice cap',
  category: 'accessories',
  image: 'cap.jpg',
  rating: {
    rate: 4.0,
    count: 50,
  },
}))

const sneakerProduct = Product.create(({
  id: 2,
  title: 'Sneakers',
  price: 60.00,
  description: 'Comfortable sneakers',
  category: 'footwear',
  image: 'sneakers.jpg',
  rating: {
    rate: 4.5,
    count: 80,
  },
}))

describe('computeCartTotalUseCase', () => {
  it('computes total price of items in cart', async () => {
    const cartRepository = new CartRepositoryMock()
    const productRepositoryMock = new ProductRepositoryMock([capProduct, sneakerProduct])

    const addItem = new AddItemToCartUseCase(cartRepository, productRepositoryMock)

    await addItem.execute({ productId: 1, quantity: 2 }) // 2 * 10.00 = 20.00
    await addItem.execute({ productId: 2, quantity: 1 }) // 1 * 50.00 = 50.00

    const useCase = new ComputeCartTotalUseCase(cartRepository)
    const result = await useCase.execute()

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value.totalItems).toBe(3)
      expect(result.value.totalAmount).toBe(90)
    }
  })
  it('returns zero totals when the cart is empty', async () => {
    const cartRepository = new CartRepositoryMock()
    const useCase = new ComputeCartTotalUseCase(cartRepository)

    const result = await useCase.execute()

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value.totalItems).toBe(0)
      expect(result.value.totalAmount).toBe(0)
    }
  })
})
