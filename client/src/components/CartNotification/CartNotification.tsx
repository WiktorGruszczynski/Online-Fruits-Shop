import { CartNotificationProps } from "../../typings/CartNotificationProps";
import "./CartNotification.css"
import {ReactComponent as Cross} from "../../assets/cross.svg"

function CartNotification({message, handleClose}:CartNotificationProps){
    const SVG_SIZE = "45%";

    return <div className="cart-notification kanit-regular">
        <div className="notification-header">
            <div className="notification-header-side"></div>
            <h1>Notification</h1>
            <div className="notification-header-side flex-center">
                <Cross width={SVG_SIZE} height={SVG_SIZE} className="notification-cross" onClick={()=>{handleClose()}}/>
            </div>
        </div>
        
        <p className="notification-text">{message}</p>
    </div>
}

export default CartNotification;