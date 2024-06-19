import { StoreProduct } from "./StoreProduct";

export interface CartItem {
    product: StoreProduct,
    quantity: number
}