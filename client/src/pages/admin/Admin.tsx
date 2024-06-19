import { useState } from "react"
import Token from "../../components/Token/Token";
import "./Admin.css"
import ProductEditor from "../../components/ProductEditor/ProductEditor";

function Admin(){
    const [element, setElement] = useState("token");

    return <div className="admin">
        <ul className="sidebar kanit-regular">
            <li className='sidebar-element' onClick={()=>setElement("token")}>Token</li>
            <li className='sidebar-element' onClick={()=>setElement("products")}>Products</li>
          </ul>
          <div id="admin-content" className='flex-center'>
            {element==="token"?<Token/>:<></>}
            {element==="products"?<ProductEditor/>:<></>}
          </div>
    </div>
}

export default Admin;