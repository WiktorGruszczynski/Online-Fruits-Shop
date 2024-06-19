import "./AdminNotification.css"
import {ReactComponent as Cross} from "../../assets/cross.svg"
import { AdminNotificationProps } from "../../typings/AdminNotificationProps";

function AdminNotification({succes, onClose}:AdminNotificationProps){
    const SVG_SIZE = "18px";

    const result = succes?"succes":"failure";

    return (
        <div className={`admin-notification ${result} flex-center`}>
            <h1>{result}</h1>
            <Cross width={SVG_SIZE} height={SVG_SIZE} className="admin-notification-cross" onClick={onClose}/>
        </div>
    )
}
export default AdminNotification;