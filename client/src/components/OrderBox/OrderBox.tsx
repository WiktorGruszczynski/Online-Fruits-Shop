import dateFromTimestamp from "../../services/dateFromTimestamp";
import formatPrice from "../../services/formatPrice";
import round from "../../services/round";
import { Order } from "../../typings/Order";
import CartProduct from "../CartProduct/CartProducts";
import {ReactComponent as Triangle} from "../../assets/triangle.svg"
import "./OrderBox.css"
import { useState } from "react";

function OrderBox({cartItems, timestamp}: Order){
    const SVG_SIZE = "60%";
    var total = 0;

    const [orderVisible, setOrderVisible] = useState<Boolean>(false);
    const [triangleRotated, setTriangleRotated] = useState<Boolean>(false);

    cartItems.forEach(item => {
        total += round(item.quantity*item.product.price ,2);
    })

    const handleTriangleClick = () => {
        setOrderVisible(e => !e)
        setTriangleRotated(e=>!e)
    }


    return <div className="order-box">
        <div className="order-title">
            <div className="order-title-content">
                <h1>{dateFromTimestamp(timestamp)}</h1>
                <div className="triangle-area flex-center">
                    <Triangle width={SVG_SIZE} height={SVG_SIZE} className={`triangle-icon ${triangleRotated?"rotated":""}`} onClick={handleTriangleClick}/>
                </div>
            </div>
        </div>
        <div className={`order-content ${orderVisible?"":"hidden"}`}>
            {cartItems.map(item => <CartProduct 
                product={item.product} 
                count={item.quantity} 
                handleRemove={()=>{}} 
                bin={false}/>)
            }
            <div className="totals-header">
                    <div className="total"></div>
                    <div className="total"></div>
                    <div className="total kanit-bold">Total</div>
                    <div className="total kanit-bold">{formatPrice(round(total, 2))}$</div>
            </div>
        </div>

    </div>
}

export default OrderBox;