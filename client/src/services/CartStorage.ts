import { CartItem } from "../typings/CartItem";

function updateLocalStorage(items: CartItem[]){
    window.localStorage.setItem("cart", JSON.stringify(items))
}

class CartStorage {
    items: CartItem[];
    

    constructor () {
        var cartString = window.localStorage.getItem("cart");
        if (cartString == null){
            this.items = []
        }
        else{
            this.items = JSON.parse(cartString);
        }
    }


    get(){
        return this.items;
    }


    add(item: CartItem){
        for (var i=0; i<this.items.length; i++){
            if (this.items[i].product.id === item.product.id){
                this.items[i].quantity += item.quantity;
            }
        }
    
        if (this.items.filter(e => (e.product.id === item.product.id)).length === 0 ){
            this.items.push(item)
        }

        updateLocalStorage(this.items)
    }

    clear(){
        this.items = [];
        updateLocalStorage([]);
    }

    
    removeById(id: number){
        this.items = this.items.filter(item => (item.product.id !== id))
        updateLocalStorage(this.items)
    }


}

export default CartStorage;