import { ChangeEvent, useEffect, useRef, useState } from "react";
import { StoreProduct } from "../../typings/StoreProduct";
import "./ProductEditBox.css"
import post from "../../services/post";
import Cookies from "universal-cookie";
import countCharacters from "../../services/countCharacters";
import AdminNotification from "../AdminNotification/AdminNotification";
import {ReactComponent as Bin} from "../../assets/bin.svg"
import get from "../../services/get";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";


function ProductEditBox({id, name, thumbnail, price, availability}: StoreProduct){
    const cookies = new Cookies();
    const IMG_SIZE = 72;
    const SVG_SIZE = 38;
    const numbers = "1234567890";

    const [notification, setNotification] = useState<Boolean>(false);
    const [notificationResult, setNotificationResult] = useState<boolean>(false);

    
    const [file, setFile] = useState<string>(thumbnail);
    const [newName, setProductName] = useState<string>(name);
    const [newPrice, setNewPrice] = useState<string>(`${price}`);
    const [newThumbnail, setNewThumbnail] = useState<File>();
    const [newAvailability, setNewAvailability] = useState<boolean>(availability);
    
    const inputFile = useRef<HTMLInputElement | null>(null);


    const handleImageInput = (e: any) => {
        console.log(e.target.files.length)
        setNewThumbnail(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]))
    }


    const handlePriceInput = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        
        // filter 
        value = value.replace(/[^0-9.]/g, "");

        const addedChar = e.target.value[value.length-1];
        

        if (value == ".")    value = "0."
        
        if (value.startsWith("0") && !value.includes(".") && numbers.includes(addedChar))    value = addedChar;
        
        if (addedChar==="." && countCharacters(value, ".")>1)    return;
        

        if (value.includes(".")){
            const cents = value.split(".")[1];
            if (cents.length>2) return;
        }
        
        setNewPrice(value);
    }


    const editExistingProduct = async () => {
        const formData = new FormData();

        if (newName !== name)    formData.append("name", newName)
        if (newPrice !== `${price}`)    formData.append("price", newPrice)
        if (newThumbnail)    formData.append("thumbnail", newThumbnail)
        
        const isFormDataEmpty = formData.values().next().done;

        if (!isFormDataEmpty){
            formData.append("id", `${id}`);

            const response = await post(`api/product/edit?token=${cookies.get("admin_token")}`, formData, null)
            if (response.ok){
                return (await response.text())==="true"
            }
        }

        return false;
    }

    const addNewProduct = async () => {
        const formData = new FormData();
        const productScheme = {
            name: newName,
            price: Number(newPrice),
        }

        formData.append("product", JSON.stringify(productScheme))

        if (newThumbnail){
            formData.append("file", newThumbnail);
        }
        else{
            return false;
        }
        

        const response = await post(`api/product/add?token=${cookies.get("admin_token")}`, formData, null);

        if (response.ok){
            const response_json = await response.json();
            if (response_json?.succes){
                return true;
            }
        }
        
        return false;
    }

    const handleSave = async () => {
        let result:boolean;
        if (id == -1){
            result = await addNewProduct()
        }
        else{
            result = await editExistingProduct();
        }

        setNotificationResult(result);
        setNotification(true);
    }

    const updateItemDbAvailability = async () => {
        setNewAvailability(e=>!e);

        await post(`api/product/setAvailability?token=${cookies.get("admin_token")}`, {
            productId: id,
            availability: !newAvailability
        })
        
    }


    return <li className="product-edit-box kanit-regular">
        <div className="value-cell flex-center">{id==-1?"ID":id}</div>
        <div className="value-cell editable flex-center">
            <img src={file} alt="product image"  height={IMG_SIZE} className="c-pointer flex-center thumbnail-preview" onClick={() => {inputFile.current?.click()}}/>
            <input type="file" className="image-input" ref={inputFile}  accept="image/jpeg, image/jpeg, image/png" id="hidden-file-input" onChange={handleImageInput}/>
        </div>
        <div className="value-cell editable flex-center">
            <input type="text" placeholder="product name" value={newName==="name"?"":newName} className="kanit-regular" onChange={e => setProductName(e.target.value)}/>
        </div>
        <div className="value-cell editable flex-center">
            <input type="text" value={newPrice==="0"?"":newPrice} placeholder="product price" className="kanit-regular" onChange={handlePriceInput}/>
        </div>
        <div className="value-cell flex-center opt">
            <button className="edit-save kanit-regular" onClick={handleSave}>Save</button>
            <ToggleSwitch defaultValue={availability} handleClick={updateItemDbAvailability}/>
        </div>
        {notification?<AdminNotification succes={notificationResult} onClose={()=>{setNotification(false)}}/>:<></>}
    </li>
}

export default ProductEditBox;