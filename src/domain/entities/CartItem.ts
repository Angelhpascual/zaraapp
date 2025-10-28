import type { Product } from './Product'

export interface CartItemProps {
  product: Product
  quantity: number
}

export class CartItem {
  private readonly product: Product
  private readonly quantity: number

  private constructor(props: CartItemProps) {
    this.product = props.product
    this.quantity = props.quantity
  }

  static create(props: CartItemProps): CartItem {
    if (props.quantity <= 0) {
      throw new Error('Invalid quantity')
    }
    return new CartItem(props)
  }

  increase(amount: number) {
    if (amount <= 0) {
      throw new Error('Invalid amount')
    }
    return CartItem.create({
      product: this.product,
      quantity: this.quantity + amount,
    })
  }

  updateQuantity(quantity: number) {
    return CartItem.create({
      product: this.product,
      quantity,
    })
  }

  get subtotal(): number {
    return this.product.price * this.quantity
  }

  get productId(): number {
    return this.product.id
  }

  get totalQuantity(): number {
    return this.quantity
  }

  get productTitle(): string {
    return this.product.title
  }

  get productPrice(): number {
    return this.product.price
  }

  get productImage(): string {
    return this.product.image
  }

  get productDescription(): string {
    return this.product.description
  }

  get productCategory(): string {
    return this.product.category
  }

  get productRating() {
    return this.product.rating
  }
}
