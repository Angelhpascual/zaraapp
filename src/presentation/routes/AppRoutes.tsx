import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CartPage from '../pages/CartPage'
import ProductsPage from '../pages/ProductsPage'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  )
}
