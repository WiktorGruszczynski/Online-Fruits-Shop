import "./Product.css"
import {ReactComponent as MinusSign} from "../../assets/minus.svg";
import {ReactComponent as PlusSign} from "../../assets/plus.svg";
import { ChangeEvent, useState } from "react";
import { StoreProduct } from "../../typings/StoreProduct";
import formatPrice from "../../services/formatPrice";
import capitalize from "../../services/capitalize";
import { ProductComponent } from "../../typings/ProductComponent";
import { CartItem } from "../../typings/CartItem";
import CartStorage from "../../services/CartStorage";



function Product ({product, handleNotification}: ProductComponent){
    const SVG_SIZE = "70%";
    const PRODUCT_IMAGE_SIZE = 156;
    const MAX_COUNT_INPUT_VALUE = 1_000_000;
    const CURRENCY = "$";

    const cartStorage = new CartStorage();

    const [count, setCount] = useState(0);
    const {id,name,price,thumbnail} = product;

    const handleCountInput = (event:ChangeEvent<HTMLInputElement>) => {
        const stringValue = event.target.value.replace(/\D/g,'');
        
        if (stringValue===""){
            setCount(0)
        }
        else{
            const value = Number(stringValue);
            if (value>0 && value<=MAX_COUNT_INPUT_VALUE){
                setCount(value)
            }
        }

    }


    const updateCount = (n: number) => {
        if (n===1 && count<MAX_COUNT_INPUT_VALUE){
            setCount(count+1)
        }
        if (n===-1 && count>0){
            setCount(count-1)
        }
    }


    const handeAddButton = () => {
        if (count === 0) return;

        const product: StoreProduct = {
            id: id,
            name: name,
            thumbnail: thumbnail,
            price: price,
            availability: true
        }

        const item: CartItem = {
            product: product,
            quantity: count,
        }

        setCount(0);
        cartStorage.add(item);
        handleNotification(item);
    }


    return( 
        <div className="product-container">

            <div className="product">
                <div className="product-header flex-center">
                    <h1>{capitalize(name)}</h1>
                </div>
                <div className="image-area flex-center">
                    <img src={thumbnail} width={PRODUCT_IMAGE_SIZE} alt={name} className="product-image"/>
                </div>
                <div className="product-label-area-small flex-center">
                    <h2>{formatPrice(price)} {CURRENCY}</h2>
                </div>
                <div className="product-label-area flex-center">
                    <div className="product-label flex-center count-label">

                        <MinusSign width={SVG_SIZE} height={SVG_SIZE} className="product-label-svg" onClick={()=>updateCount(-1)}/>
                        <input type="text" value={count} onChange={handleCountInput} placeholder="Count" className="count-input kanit-regular"/>
                        <PlusSign width={SVG_SIZE} height={SVG_SIZE} className="product-label-svg" onClick={()=>updateCount(1)}/>
                        
                    </div>
                </div>
                <div className="product-label-area flex-center">
                    <div className="product-label flex-center">
                        <button className="add-to-cart-btn kanit-regular" onClick={handeAddButton}>Add</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Product;