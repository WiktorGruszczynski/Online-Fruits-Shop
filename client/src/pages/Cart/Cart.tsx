import "./Cart.css"
import CartProduct from "../../components/CartProduct/CartProducts";
import formatPrice from "../../services/formatPrice";
import CartStorage from "../../services/CartStorage";
import {  useState } from "react";
import { CartItem } from "../../typings/CartItem";
import round from "../../services/round";
import post from "../../services/post";
import Cookies from "universal-cookie";


function Cart(){
    const cartStorage = new CartStorage();
    const cookies = new Cookies();

    const [items, setItems] = useState<CartItem[]>(cartStorage.get());

    
    var total = 0;

    items.forEach(item => {
        total += item.quantity*item.product.price
    })

    const removeItem = (id: number) => {
        setItems(items => items.filter(item => (item.product.id !== id)))
        cartStorage.removeById(id)
    }

    const handlePurchase = async () => {
        setItems([]);
        const order = {
            cartItems: items,
            timestamp: new Date().getTime()
        };

        cartStorage.clear();

        const token = cookies.get("auth_token")

        await post(`api/orders/add?token=${token}`, order)
    }


    return (
    <div className="cart">
        <div className="cart-title flex-center">
            <h1>Shopping cart</h1>
        </div>
        <div className="product-headers kanit-regular">
            <div className="product-title">Product</div>
            <div className="price-title">Price</div>
            <div className="quantity-title">Quantity</div>
            <div className="subtotal-title">Subtotal</div>
        </div>
        <ul className="products-list kanit-light">
            {items.map(item => 
                <CartProduct product={item.product} count={item.quantity} handleRemove={removeItem} bin={true}/>
            )}
        </ul>
        <div className="totals-header">
            <div className="total"></div>
            <div className="total"></div>
            <div className="total kanit-bold">Total</div>
            <div className="total kanit-bold">{formatPrice(round(total, 2))}$</div>
        </div>
        <div className="checkout-container">
            <div className="checkout-box flex-center">
                <button className="buy-btn kanit-bold" onClick={handlePurchase}>Purchase</button>
            </div>
        </div>
    </div>
    )
}

export default Cart;