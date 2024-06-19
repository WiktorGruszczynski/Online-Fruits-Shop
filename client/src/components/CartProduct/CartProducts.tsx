import capitalize from "../../services/capitalize";
import formatPrice from "../../services/formatPrice";
import "./CartProduct.css"
import {ReactComponent as Bin} from "../../assets/bin.svg"
import { CartProductProps } from "../../typings/CartProductProps";
import round from "../../services/round";


function CartProduct({product, count, handleRemove, bin}: CartProductProps){
    const {id, name, price, thumbnail} = product;
    const SVG_SIZE = 30;


    return <li className="cart-product">
        <div className="product-tile kanit-bold">
            <div className="cart-item-image-area">
                <img src={thumbnail} height="100%" alt={name}/>
            </div>
            {capitalize(name)}
        </div>
        <div className="price-tile kanit-regular">{formatPrice(price)}$</div>
        <div className="quantity-tile">{count}</div>
        <div className="subtotal-tile">
            {formatPrice(round(price*count, 2))}$
            {bin?
            <Bin width={SVG_SIZE} height={SVG_SIZE} className="bin" onClick={() => handleRemove(id)}/>:
            <></>}
        </div>
    </li>
}

export default CartProduct;