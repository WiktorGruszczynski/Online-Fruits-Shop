import { useEffect, useState } from "react";
import { StoreProduct } from "../../typings/StoreProduct";
import get from "../../services/get";
import Cookies from "universal-cookie";
import "./ProductEditor.css"
import ProductEditBox from "../ProductEditBox/ProductEditBox";
import AdminNotification from "../AdminNotification/AdminNotification";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function ProductEditor(){

    const [products, setProducts] = useState<StoreProduct[]>([]);
    const [tokenValid, setTokenValid] = useState<Boolean>(false);
    const cookies = new Cookies();
    const admin_token = cookies.get("admin_token");

    const isTokenValid = async () => {
        const response = await get(`api/admin/validateToken?token=${admin_token}`);

        if (response.ok){
            setTokenValid(await response.text() === "true")
        }
    }

    const fetchProducts = async () => {
        const response = await get("api/product/getAll")
        const json_response: Array<StoreProduct> = await response.json()

        setProducts(json_response);
    }


    const fetchData = async () => {
        await fetchProducts()
        await isTokenValid();
    }


    useEffect(()=>{fetchData()}, [])


    const handleAddNewProductBtn = () => {
        const productScheme: StoreProduct = {
            id: -1,
            name: "name",
            thumbnail: "image",
            price: 0,
            availability: true
        };

        setProducts(prev => [...prev, productScheme])
    }

    

    return <>
        {tokenValid?
        <ul className="products-editor-table">
            <div className="editor-headers">
                <h1 className="flex-center">Id</h1>
                <h1 className="flex-center">Image</h1>
                <h1 className="flex-center">Name</h1>
                <h1 className="flex-center">Price</h1>
            </div>
            {products.map(product => <ProductEditBox id={product.id} 
                                                     name={product.name} 
                                                     thumbnail={product.thumbnail} 
                                                     price={product.price} 
                                                     availability={product.availability}/>)
            }
            <div className="add-product flex-center">
                <button className="add-btn kanit-regular" onClick={handleAddNewProductBtn}>Add new product</button>
            </div>
        </ul>:
        <h1 className="error-message">INVALID TOKEN</h1>
        }
    </>
}   

export default ProductEditor;