import { useEffect } from 'react'
import { useCartStore } from '../store/cart.store'

export function useCart() {
  const totals = useCartStore(state => state.totals)
  const cartLoading = useCartStore(state => state.isLoading)
  const cartError = useCartStore(state => state.error)
  const loadTotals = useCartStore(state => state.loadTotals)
  const addItem = useCartStore(state => state.addItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const removeItem = useCartStore(state => state.removeItem)
  const clear = useCartStore(state => state.clear)

  useEffect(() => {
    void loadTotals()
  }, [loadTotals])

  return { totals, isLoading: cartLoading, error: cartError, refetchTotals: loadTotals, addItem, updateQuantity, removeItem, clear }
}
