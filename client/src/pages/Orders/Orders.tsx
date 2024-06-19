import Cookies from "universal-cookie";
import get from "../../services/get";
import "./Orders.css"
import { useEffect, useState } from "react";
import { Order } from "../../typings/Order";
import OrderBox from "../../components/OrderBox/OrderBox";

function Orders(){

    const [orders, setOrders] = useState<Order[]>([]);

    const fetchData = async () => {
        const cookies = new Cookies();
        const authToken = cookies.get("auth_token");

        const response = await get(`api/orders/getUserOrders?token=${authToken}`)

        const response_json = await response.json();

        setOrders(response_json?.content)
    }

    useEffect(() => {fetchData()}, [])


    return <div className="orders">
        <div className="orders-title flex-center">
            <h1>Orders</h1>
        </div>
        {orders.map(order => <OrderBox cartItems={order.cartItems} timestamp={order.timestamp}/>)}

    </div>
}

export default Orders;