import { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import "./Home.css"
import { StoreProduct } from "../../typings/StoreProduct";
import CartNotification from "../../components/CartNotification/CartNotification";
import { CartItem } from "../../typings/CartItem";
import capitalize from "../../services/capitalize";
import get from "../../services/get";
import isUserLogged from "../../services/isUserLogged";


function Home() {
    const [products, setProducts] = useState<StoreProduct[]>([]);
    const [notifications, setNotifications] = useState<string[]>([]);



    const getData = async () => {
        const response = await get("api/product/getAllAvailable")
        
        const json_response: Array<StoreProduct> = await response.json()
        
        // filter in order to remove NULL elements
        setProducts(json_response.filter(n=>n));

    }

    useEffect(()=>{getData()}, [])

    const handleNotification = (item: CartItem) => {
        var msg;
        const {product, quantity} = item;

        if (isUserLogged()){
            msg = `Added ${capitalize(product.name)} x${quantity} to cart`;
        }
        else{
            msg = "You have to login before purchasing any product"
        }



        setNotifications(  [...notifications, msg])
    }

    const closeNotification = () => {
        setNotifications(prev => (prev.slice(0, -1)))
    }


    return (
    <div className="home">
        {products.map(product => <Product product={product} handleNotification={(item) => {handleNotification(item)}} key={product.id}/>)}
        {notifications.map(msg => <CartNotification message={msg} handleClose={()=>{closeNotification()}} key={msg}/>)}
    </div>)
}

export default Home;