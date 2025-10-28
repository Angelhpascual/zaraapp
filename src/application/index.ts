import { AuthHttpRepository } from '../infrastructure/http/AuthHttpRepository'
import { ProductHttpRepository } from '../infrastructure/http/ProductHttpRepository'
import { CartLocalRepository } from '../infrastructure/persistence/CartLocalRepository'
import { GetSessionUseCase } from './use-cases/auth/GetSessionUseCase'
import { LoginUseCase } from './use-cases/auth/LoginUseCase'
import { LogoutUseCase } from './use-cases/auth/LogoutUseCase'
import { AddItemToCartUseCase } from './use-cases/cart/AddItemToCartUseCase'
import { ClearCartUseCase } from './use-cases/cart/ClearCartUseCase'
import { ComputeCartTotalUseCase } from './use-cases/cart/ComputeCartTotalUseCase'
import { GetCartUseCase } from './use-cases/cart/GetCartUseCase'
import { RemoveItemFromCartUseCase } from './use-cases/cart/RemoveItemFromCartUseCase'
import { UpdateCartItemUseCase } from './use-cases/cart/UpdateCartItemUseCase'
import { CreateProductUseCase } from './use-cases/product/CreateProductUseCase'
import { DeleteProductUseCase } from './use-cases/product/DeleteProductUseCase'
import { ListProductUseCase } from './use-cases/product/ListProductsUseCase'
import { UpdateProductUseCase } from './use-cases/product/UpdateProductUseCase'

const productRepository = new ProductHttpRepository()
const cartRepository = new CartLocalRepository()
const authRepository = new AuthHttpRepository()

export const listProductUseCase = new ListProductUseCase(productRepository)
export const createProductUseCase = new CreateProductUseCase(productRepository)
export const updateProductUseCase = new UpdateProductUseCase(productRepository)
export const deleteProductUseCase = new DeleteProductUseCase(productRepository)

export const addItemToCartUseCase = new AddItemToCartUseCase(cartRepository, productRepository)
export const updateCartItemUseCase = new UpdateCartItemUseCase(cartRepository)
export const removeItemFromCartUseCase = new RemoveItemFromCartUseCase(cartRepository)
export const clearCartUseCase = new ClearCartUseCase(cartRepository)
export const computeCartTotalUseCase = new ComputeCartTotalUseCase(cartRepository)
export const getCartUseCase = new GetCartUseCase(cartRepository)

export const loginUseCase = new LoginUseCase(authRepository)
export const logoutUseCase = new LogoutUseCase(authRepository)
export const getSessionUseCase = new GetSessionUseCase(authRepository)

export { authRepository, cartRepository, productRepository }
