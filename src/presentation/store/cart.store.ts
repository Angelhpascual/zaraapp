import { create } from 'zustand'
import type { CartItemDTO } from '../../application/DTOs/CartDTOs/CartItemDTO'
import type { CartTotalDTO } from '../../application/DTOs/CartDTOs/CartTotalDTO'
import {
  addItemToCartUseCase,
  clearCartUseCase,
  getCartUseCase,
  removeItemFromCartUseCase,
  updateCartItemUseCase,
} from '../../application'

type CartState = {
  items: CartItemDTO[]
  totals: CartTotalDTO
  isLoading: boolean
  error: string | null
}

type CartActions = {
  loadCart: () => Promise<void>
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

  loadCart: async () => {
    const result = await getCartUseCase.execute()
    if (result.ok) {
      set({ items: result.value.items, totals: result.value.totals, error: null })
    }
    else {
      set({ error: result.error.message })
    }
  },

  addItem: async (productId, quantity) => {
    set({ isLoading: true, error: null })
    const result = await addItemToCartUseCase.execute({ productId, quantity })

    if (result.ok) {
      await get().loadCart()
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
      await get().loadCart()
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
      await get().loadCart()
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
