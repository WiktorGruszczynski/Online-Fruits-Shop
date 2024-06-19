import { CartItem } from "./CartItem";
import { StoreProduct } from "./StoreProduct";

export interface ProductComponent {
    product: StoreProduct,
    handleNotification: (item: CartItem)=>void
}