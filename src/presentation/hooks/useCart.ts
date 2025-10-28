import { useEffect } from 'react'
import { useCartStore } from '../store/cart.store'

export function useCart() {
  const items = useCartStore(state => state.items)
  const totals = useCartStore(state => state.totals)
  const isLoading = useCartStore(state => state.isLoading)
  const error = useCartStore(state => state.error)
  const loadCart = useCartStore(state => state.loadCart)
  const addItem = useCartStore(state => state.addItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const removeItem = useCartStore(state => state.removeItem)
  const clear = useCartStore(state => state.clear)

  useEffect(() => {
    void loadCart()
  }, [loadCart])

  return {
    items,
    totals,
    isLoading,
    error,
    refetchCart: loadCart,
    addItem,
    updateQuantity,
    removeItem,
    clear,
  }
}
