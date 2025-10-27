import { useCart } from '../hooks/useCart'

export function CartPage() {
  const {
    totals,
    isLoading,
    error,
    refetchTotals,
    clear,
  } = useCart()

  if (isLoading) {
    return <p className="py-12 text-center text-lg font-medium">Recalculando carrito...</p>
  }

  if (error) {
    return (
      <section className="flex flex-col items-center gap-4 py-12">
        <p className="text-red-600">
          No ha sido posible cargar el carrito:
          {' '}
          {error}
        </p>
        <button
          type="button"
          onClick={() => void refetchTotals()}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        >
          Reintentar
        </button>
      </section>
    )
  }

  if (totals.totalItems === 0) {
    return (
      <section className="py-16 text-center">
        <h1 className="text-3xl font-semibold">Tu carrito está vacío</h1>
        <p className="mt-2 text-sm text-gray-600">
          Añade productos desde la página principal para verlos aquí.
        </p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Carrito</h1>
          <p className="text-sm text-gray-600">Resumen de tus productos</p>
        </div>
        <button
          type="button"
          onClick={() => void clear()}
          className="rounded bg-rose-600 px-4 py-2 text-white hover:bg-rose-500"
        >
          Vaciar carrito
        </button>
      </header>

      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <dl className="space-y-4 text-lg">
          <div className="flex items-center justify-between">
            <dt>Total de artículos:</dt>
            <dd className="font-semibold">{totals.totalItems}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>Importe total:</dt>
            <dd className="text-2xl font-bold text-indigo-600">
              {totals.totalAmount.toFixed(2)}
              {' '}
              €
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-sm text-gray-500">
          * Próximamente se mostrarán los productos y podrás editar cantidades desde esta página.
        </p>
      </div>
    </section>
  )
}

export default CartPage
