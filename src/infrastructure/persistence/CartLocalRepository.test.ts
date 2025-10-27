import { describe, expect, it } from 'vitest'
import { Cart } from '../../domain/entities/Cart'
import { CartItem } from '../../domain/entities/CartItem'
import { Product } from '../../domain/entities/Product'
import { CartLocalRepository } from './CartLocalRepository'

const product = Product.create({
  id: 1,
  title: 'Sneakers',
  price: 60,
  description: 'Running shoes',
  category: 'shoes',
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: {
    rate: 4.2,
    count: 12,
  },
})

describe('productHttpRepository', () => {
  it('returns empty cart by default', async () => {
    const repository = new CartLocalRepository()
    const cart = await repository.get()

    expect(cart.totalItems).toBe(0)
    expect(cart.totalAmount).toBe(0)
  })
  it('persists cart after save', async () => {
    const repository = new CartLocalRepository()
    const cart = Cart.empty().addItem(CartItem.create({ product, quantity: 2 }))

    await repository.save(cart)
    const savedCart = await repository.get()

    expect(savedCart.totalItems).toBe(2)
    expect(savedCart.totalAmount).toBe(120)
  })
  it('clears saved cart', async () => {
    const repository = new CartLocalRepository()
    const cart = Cart.empty().addItem(CartItem.create({ product, quantity: 2 }))

    await repository.save(cart)
    await repository.clear()
    const emptyCart = await repository.get()

    expect(emptyCart.totalItems).toBe(0)
    expect(emptyCart.totalAmount).toBe(0)
  })
})
