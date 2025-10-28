import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useProducts } from '../hooks/useProducts'

export function ProductsPage() {
  const { products, isLoading, error, refetch } = useProducts()
  const { totals, addItem, isLoading: cartLoading, error: cartError } = useCart()

  if (isLoading) {
    return <div className="text-center py-12 text-lg font-medium">Loading products...</div>
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-red-600">
          No se pudieron cargar los productos:
          {error}
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Products</h1>
        {cartLoading && <span className="text-sm text-gray-500">Updating Cart...</span>}
        {cartError && (
          <span className="text-sm text-red-600">
            Error:
            {cartError}
          </span>
        )}
        <Link to="/cart" className="inline-flex items-center gap-2 rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800">
          <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
          <span>Carrito</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-semibold text-gray-900">{totals.totalItems}</span>
        </Link>
      </header>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <article
            key={product.id}
            className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
            <div className="mt-4 flex flex-col gap-2">
              <h2 className="text-lg font-medium">{product.title}</h2>
              <p className="line-clamp-3 text-sm text-gray-600">{product.description}</p>
              <span className="text-xl font-semibold text-indigo-600">
                $
                {product.price}
              </span>
            </div>
            <button onClick={() => addItem(product.id, 1)} className="mt-auto rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 ">
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProductsPage
