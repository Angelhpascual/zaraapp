import { useEffect } from 'react'
import { useProductStore } from '../store/product.store'

export function useProducts() {
  const { products, isLoading, error, fetchProducts } = useProductStore()

  useEffect(() => {
    if (products.length === 0) {
      void fetchProducts()
    }
  }, [products, fetchProducts])

  return { products, isLoading, error, refetch: fetchProducts }
}
