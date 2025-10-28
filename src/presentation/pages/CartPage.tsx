import { useCart } from '../hooks/useCart'

export function CartPage() {
  const {
    items,
    totals,
    isLoading,
    error,
    refetchCart,
    updateQuantity,
    removeItem,
    clear,
  } = useCart()

  if (isLoading) {
    return <p className="py-12 text-center text-lg font-medium">Actualizando carrito...</p>
  }

  if (error) {
    return (
      <section className="flex flex-col items-center gap-4 py-12">
        <p className="text-red-600">No ha sido posible cargar el carrito: {error}</p>
        <button
          type="button"
          onClick={() => void refetchCart()}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        >
          Reintentar
        </button>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="py-16 text-center">
        <h1 className="text-3xl font-semibold">Tu carrito está vacío</h1>
        <p className="mt-2 text-sm text-gray-600">Añade productos desde la página principal para verlos aquí.</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Carrito</h1>
          <p className="text-sm text-gray-600">Gestiona los productos y cantidades antes de finalizar la compra.</p>
        </div>
        <button
          type="button"
          onClick={() => void clear()}
          className="rounded bg-rose-600 px-4 py-2 text-white hover:bg-rose-500"
        >
          Vaciar carrito
        </button>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.productId} className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
              <img src={item.image} alt={item.title} className="h-24 w-24 rounded object-cover" />
              <div className="flex flex-1 flex-col gap-2">
                <h2 className="text-lg font-medium">{item.title}</h2>
                <span className="text-sm text-gray-500">Precio unidad: {item.price.toFixed(2)} €</span>
                <span className="text-sm font-semibold text-indigo-600">Subtotal: {item.subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (item.quantity > 1) {
                      void updateQuantity(item.productId, item.quantity - 1)
                    }
                    else {
                      void removeItem(item.productId)
                    }
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-lg"
                >
                  −
                </button>
                <span className="w-10 text-center text-lg font-medium">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => void updateQuantity(item.productId, item.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-lg"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => void removeItem(item.productId)}
                className="text-sm text-rose-600 hover:text-rose-500"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>

        <aside className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Resumen</h2>
          <div className="flex items-center justify-between text-lg">
            <span>Total de artículos:</span>
            <span className="font-semibold">{totals.totalItems}</span>
          </div>
          <div className="flex items-center justify-between text-xl font-bold text-indigo-600">
            <span>Total:</span>
            <span>{totals.totalAmount.toFixed(2)} €</span>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default CartPage
