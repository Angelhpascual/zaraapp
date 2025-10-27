import { describe, expect, it } from 'vitest'
import { ProductHttpRepository } from '../ProductHttpRepository'

describe('productHttpRepository', () => {
  it('get product list', async () => {
    const repository = new ProductHttpRepository()
    const products = await repository.findAll()

    expect(products.length).toBeGreaterThan(0)
    expect(products[0].title).toBe('Camiseta Básica')
  })
})
