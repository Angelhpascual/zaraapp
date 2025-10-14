export interface ProductProps {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export class Product {
  private readonly props: ProductProps

  private constructor(props: ProductProps) {
    this.props = { ...props }
  }

  static create(props: ProductProps): Product {
    if (!props.title?.trim()) {
      throw new Error("Invalid title")
    }
    if (props.price <= 0) {
      throw new Error("Invalid price")
    }
    return new Product(props)
  }

  update(payload: Partial<ProductProps>) {
    return Product.create({ ...this.props, ...payload })
  }

  get id() {
    return this.props.id
  }

  get title() {
    return this.props.title
  }
  get price() {
    return this.props.price
  }

  get description() {
    return this.props.description
  }

  get category() {
    return this.props.category
  }

  get image() {
    return this.props.image
  }

  get rating() {
    return this.props.rating
  }
}
