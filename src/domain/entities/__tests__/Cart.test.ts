import { describe, expect, it } from 'vitest'
import { mockProduct } from '../../../shared/mocks/mockProduct'
import { Cart } from '../Cart'
import { CartItem } from '../CartItem'
import { Product } from '../Product'

describe('cart', () => {
  it('should create an empty cart', () => {
    const cart = Cart.empty()

    expect(cart.allItems).toEqual([])
    expect(cart.totalAmount).toBe(0)
    expect(cart.totalItems).toBe(0)
    expect(cart.allItems).toHaveLength(0)
  })
  it('should create a cart from items', () => {
    const cart = Cart.fromItems([
      CartItem.create({ product: Product.create(mockProduct), quantity: 2 }),
      CartItem.create({
        product: Product.create({ ...mockProduct, id: 2, price: 15 }),
        quantity: 1,
      }),
    ])

    expect(cart.allItems).toHaveLength(2)
    expect(cart.totalItems).toBe(3)
    expect(cart.totalAmount).toBe(35)
  })

  it('add a new item to cart', () => {
    const cart = Cart.empty().addItem(
      CartItem.create({ product: Product.create(mockProduct), quantity: 2 }),
    )

    expect(cart.allItems).toHaveLength(1)
    expect(cart.totalItems).toBe(2)
    expect(cart.totalAmount).toBe(20)
  })

  it('addItem increases quantity if the item already exists', () => {
    const cart = Cart.empty()
    const product1 = Product.create(mockProduct)

    const cartWithOneItem = cart.addItem(
      CartItem.create({ product: product1, quantity: 2 }),
    )
    const cartWithUpdatedItem = cartWithOneItem.addItem(
      CartItem.create({ product: product1, quantity: 3 }),
    )

    expect(cart.allItems).toHaveLength(0)

    expect(cartWithOneItem.allItems).toHaveLength(1)
    expect(cartWithOneItem.totalItems).toBe(2)
    expect(cartWithOneItem.totalAmount).toBe(20)

    expect(cartWithUpdatedItem.allItems).toHaveLength(1)
    expect(cartWithUpdatedItem.totalItems).toBe(5)
    expect(cartWithUpdatedItem.totalAmount).toBe(50)
  })

  it('updateQuantity updates the quantity of an existing item', () => {
    const cart = Cart.empty()
      .addItem(
        CartItem.create({ product: Product.create(mockProduct), quantity: 2 }),
      )
      .addItem(
        CartItem.create({
          product: Product.create({ ...mockProduct, id: 2, price: 15 }),
          quantity: 1,
        }),
      )

    const updatedCart = cart.updateQuantity(1, 5)

    expect(cart.allItems).toHaveLength(2)
    expect(cart.totalItems).toBe(3)
    expect(cart.totalAmount).toBe(35)

    expect(updatedCart.allItems).toHaveLength(2)
    expect(updatedCart.totalItems).toBe(6)
    expect(updatedCart.totalAmount).toBe(65)
  })

  it('updateQuantity does nothing if the item does not exist', () => {
    const cart = Cart.empty()
      .addItem(
        CartItem.create({ product: Product.create(mockProduct), quantity: 2 }),
      )
      .addItem(
        CartItem.create({
          product: Product.create({ ...mockProduct, id: 2, price: 15 }),
          quantity: 1,
        }),
      )

    const updatedCart = cart.updateQuantity(3, 5)

    expect(cart.allItems).toHaveLength(2)
    expect(cart.totalItems).toBe(3)
    expect(cart.totalAmount).toBe(35)

    expect(updatedCart.allItems).toHaveLength(2)
    expect(updatedCart.totalItems).toBe(3)
    expect(updatedCart.totalAmount).toBe(35)
  })

  it('removeItem removes an item from the cart', () => {
    const cart = Cart.empty()
      .addItem(
        CartItem.create({ product: Product.create(mockProduct), quantity: 2 }),
      )
      .addItem(
        CartItem.create({
          product: Product.create({ ...mockProduct, id: 2, price: 15 }),
          quantity: 1,
        }),
      )

    const updatedCart = cart.removeItem(1)

    expect(cart.allItems).toHaveLength(2)
    expect(cart.totalItems).toBe(3)
    expect(cart.totalAmount).toBe(35)

    expect(updatedCart.allItems).toHaveLength(1)
    expect(updatedCart.totalItems).toBe(1)
    expect(updatedCart.totalAmount).toBe(15)
  })
  it('removeItem does nothing if the item does not exist', () => {
    const cart = Cart.empty()
      .addItem(
        CartItem.create({ product: Product.create(mockProduct), quantity: 2 }),
      )
      .addItem(
        CartItem.create({
          product: Product.create({ ...mockProduct, id: 2, price: 15 }),
          quantity: 1,
        }),
      )

    const updatedCart = cart.removeItem(3)

    expect(cart.allItems).toHaveLength(2)
    expect(cart.totalItems).toBe(3)
    expect(cart.totalAmount).toBe(35)

    expect(updatedCart.allItems).toHaveLength(2)
    expect(updatedCart.totalItems).toBe(3)
    expect(updatedCart.totalAmount).toBe(35)
  })

  it('clear empties the cart', () => {
    const cart = Cart.empty()
      .addItem(
        CartItem.create({ product: Product.create(mockProduct), quantity: 2 }),
      )
      .addItem(
        CartItem.create({
          product: Product.create({ ...mockProduct, id: 2, price: 15 }),
          quantity: 1,
        }),
      )

    const clearedCart = cart.clear()

    expect(cart.allItems).toHaveLength(2)
    expect(cart.totalItems).toBe(3)
    expect(cart.totalAmount).toBe(35)

    expect(clearedCart.allItems).toHaveLength(0)
    expect(clearedCart.totalItems).toBe(0)
    expect(clearedCart.totalAmount).toBe(0)
  })
  it('immutability is maintained', () => {
    const cart = Cart.empty()
    const product1 = Product.create(mockProduct)
    const product2 = Product.create({ ...mockProduct, id: 2, price: 15 })
    const cartWithOneItem = cart.addItem(
      CartItem.create({ product: product1, quantity: 2 }),
    )
    const cartWithTwoItems = cartWithOneItem.addItem(
      CartItem.create({ product: product2, quantity: 1 }),
    )
    const updatedCart = cartWithTwoItems.updateQuantity(1, 5)
    const cartAfterRemoval = updatedCart.removeItem(2)
    const clearedCart = cartAfterRemoval.clear()

    expect(cart.allItems).toHaveLength(0)
    expect(clearedCart.allItems).toHaveLength(0)
    expect(cartWithOneItem.allItems).toHaveLength(1)
    expect(cartWithOneItem.totalItems).toBe(2)
    expect(cartWithOneItem.totalAmount).toBe(20)

    expect(cartWithTwoItems.allItems).toHaveLength(2)
    expect(cartWithTwoItems.totalItems).toBe(3)
    expect(cartWithTwoItems.totalAmount).toBe(35)

    expect(updatedCart.allItems).toHaveLength(2)
    expect(updatedCart.totalItems).toBe(6)
    expect(updatedCart.totalAmount).toBe(65)

    expect(cartAfterRemoval.allItems).toHaveLength(1)
    expect(cartAfterRemoval.totalItems).toBe(5)
    expect(cartAfterRemoval.totalAmount).toBe(50)
  })
  it('totalAmount sums every item subtotal', () => {
    const cart = Cart.empty()
      .addItem(
        CartItem.create({ product: Product.create(mockProduct), quantity: 2 }),
      )
      .addItem(
        CartItem.create({
          product: Product.create({ ...mockProduct, id: 2, price: 15 }),
          quantity: 1,
        }),
      )
      .addItem(
        CartItem.create({
          product: Product.create({ ...mockProduct, id: 3, price: 20 }),
          quantity: 3,
        }),
      )

    expect(cart.allItems).toHaveLength(3)
    expect(cart.totalItems).toBe(6)
    expect(cart.totalAmount).toBe(95) // 2*10 + 1*15 + 3*20 = 95
  })
})
