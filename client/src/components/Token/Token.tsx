import "./Token.css"
import ToggleInput from "../ToggleInput/ToggleInput";
import { useState } from "react";
import Cookies from "universal-cookie";


function Token(){
    const [value, setValue] = useState<string>("");
    const [warning, setWarning] = useState<Boolean>(false);

    const cookies = new Cookies();
    const minute = 60*1000;

    const expires = new Date().getTime()+minute*30;

    const saveToken = () => {
        cookies.set("admin_token", value, {
            expires: new Date(expires)
        })

        setWarning(true)
    }

    return <div className="token-wrapper">
        <div className="token-header flex-center kanit-bold">Enter your token</div>
        <div className="input-wrapper">
            <ToggleInput handleChange={e => setValue(e.target.value)} inputValue={value}/>
        </div>
        <button className="apply" onClick={saveToken}>Apply</button>
        <p className={`token-warning ${!warning?"hidden":""}`}>Token saved for 30 minutes</p>
    </div>
}

export default Token;