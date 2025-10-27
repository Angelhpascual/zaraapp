import type { CreateProductDTO } from '../../application/DTOs/ProductDTOs/CreateProductDTO'
import { create } from 'zustand'
import { listProductUseCase } from '../../application'

interface ProductState {
  products: CreateProductDTO[]
  isLoading: boolean
  error: string | null
}

interface ProductsActions {
  fetchProducts: () => Promise<void>
}

export const useProductStore = create<ProductState & ProductsActions>(set => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null })
    const result = await listProductUseCase.execute()

    if (result.ok) {
      set({
        products: result.value,
        isLoading: false,
      })
    }
    else {
      set({
        error: result.error.message,
        isLoading: false,
      })
    }
  },
}),
)
