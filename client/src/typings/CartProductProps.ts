import { StoreProduct } from "./StoreProduct";

export interface CartProductProps {
    product: StoreProduct,
    count: number,
    handleRemove: (id:number) => void,
    bin: Boolean
}