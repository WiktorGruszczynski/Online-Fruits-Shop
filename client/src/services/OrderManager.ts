import { Order } from "../typings/Order";

function loadOrders() {
    const ordersString = localStorage.getItem("orders");

    if (ordersString === null){
        return []
    }
    else{
        return JSON.parse(ordersString);
    }
}

function updateLocalStorage(orders: Order[]){
    localStorage.setItem("orders", JSON.stringify(orders));
}

class OrderManager{
    orders: Order[];

    constructor () {
        this.orders = loadOrders();
    }

    get(){
        return this.orders;
    }

    add(order: Order){
        this.orders.push(order)
        updateLocalStorage(this.orders)
    }
}

export default OrderManager;