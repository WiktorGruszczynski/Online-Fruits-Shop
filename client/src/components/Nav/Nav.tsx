import "./Nav.css"
import {ReactComponent as User} from "../../assets/user.svg"
import {ReactComponent as ShoppingCart} from "../../assets/shopping-cart.svg"
import isUserLogged from "../../services/isUserLogged";
import { useState } from "react";
import MenuLines from "./MenuLines/MenuLines";

function Nav(){
    const SVG_SIZE = 36;
    const [navShadow, setNavShadow] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const redirect = async (href: string) => {
        if (!(isUserLogged())){
            window.location.replace("/login")
        }
        else{
            window.location.replace(href)
        }
    }

    window.addEventListener("scroll", (e:Event) => {
        const scrollY = window.scrollY

        if (scrollY===0){
            setNavShadow(false)
        }
        else{
            setNavShadow(true)
        }
    })

    const displayMobileMenu = () => {
        setMobileMenu(e=>!e)
    }


    return (
        <nav className={navShadow?"nav-shadow":""}>
            <div className="nav-side-section"></div>
            <div className="nav-main-section flex-center">
                <a href="/">
                    <h1>Fruits Market</h1>
                </a>
            </div>
            <div className="nav-side-section flex-center">
  
                <div className="nav-icon-area" onClick={()=>{redirect("/cart")}}>
                    <ShoppingCart width={SVG_SIZE} height={SVG_SIZE}/>
                </div>


                <div className="nav-icon-area" onClick={()=>{redirect("/orders")}}>
                    <User width={SVG_SIZE} height={SVG_SIZE}/>
                </div>

                <div className="nav-mobile-icon-area">
                    <MenuLines handleClick={displayMobileMenu}/>
                </div>
            </div>
            <div className={`mobile-menu ${mobileMenu?"":"hidden"}`}>
                <a href={`/${isUserLogged()?"cart":"login"}`}>
                    <div className="mobile-menu-option flex-center kanit-bold">Cart</div>    
                </a> 
                <a href={`/${isUserLogged()?"orders":"login"}`}>
                    <div className="mobile-menu-option flex-center kanit-bold">Orders</div>
                </a>
            </div>
        </nav>
    )
}

export default Nav;