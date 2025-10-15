import type { CartItemDTO } from './CartItemDTO'
import type { CartTotalDTO } from './CartTotalDTO'

export interface CartDTO {
  items: CartItemDTO[]
  total: CartTotalDTO
}
