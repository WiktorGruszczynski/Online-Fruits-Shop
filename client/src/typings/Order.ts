import { CartItem } from "./CartItem";
import { StoreProduct } from "./StoreProduct";

export interface Order{
    cartItems: CartItem[]
    timestamp: number
}