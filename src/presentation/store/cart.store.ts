import type { CartItemDTO } from '../../application/DTOs/CartDTOs/CartItemDTO'
import type { CartTotalDTO } from '../../application/DTOs/CartDTOs/CartTotalDTO'
import { create } from 'zustand'
import {
  addItemToCartUseCase,
  clearCartUseCase,
  computeCartTotalUseCase,
  removeItemFromCartUseCase,
  updateCartItemUseCase,
} from '../../application'

interface CartState {
  items: CartItemDTO[]
  totals: CartTotalDTO
  isLoading: boolean
  error: string | null
}

interface CartActions {
  loadTotals: () => Promise<void>
  addItem: (productId: number, quantity: number) => Promise<void>
  updateQuantity: (productId: number, quantity: number) => Promise<void>
  removeItem: (productId: number) => Promise<void>
  clear: () => Promise<void>
}

const initialTotals: CartTotalDTO = {
  totalItems: 0,
  totalAmount: 0,
}

export const useCartStore = create<CartState & CartActions>((set, get) => ({
  items: [],
  totals: initialTotals,
  isLoading: false,
  error: null,

  loadTotals: async () => {
    const result = await computeCartTotalUseCase.execute()
    if (result.ok) {
      set({ totals: result.value })
    }
    else {
      set({ error: result.error.message })
    }
  },

  addItem: async (productId, quantity) => {
    set({ isLoading: true, error: null })
    const result = await addItemToCartUseCase.execute({ productId, quantity })

    if (result.ok) {
      await get().loadTotals()
      set({ isLoading: false })
    }
    else {
      set({ error: result.error.message, isLoading: false })
    }
  },

  updateQuantity: async (productId, quantity) => {
    set({ isLoading: true, error: null })
    const result = await updateCartItemUseCase.execute(productId, quantity)

    if (result.ok) {
      await get().loadTotals()
      set({ isLoading: false })
    }
    else {
      set({ error: result.error.message, isLoading: false })
    }
  },

  removeItem: async (productId) => {
    set({ isLoading: true, error: null })
    const result = await removeItemFromCartUseCase.execute(productId)

    if (result.ok) {
      await get().loadTotals()
      set({ isLoading: false })
    }
    else {
      set({ error: result.error.message, isLoading: false })
    }
  },

  clear: async () => {
    set({ isLoading: true, error: null })
    const result = await clearCartUseCase.execute()

    if (result.ok) {
      set({ items: [], totals: initialTotals, isLoading: false })
    }
    else {
      set({ error: result.error.message, isLoading: false })
    }
  },
}))
