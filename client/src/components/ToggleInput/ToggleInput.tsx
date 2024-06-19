import "./ToggleInput.css"
import eyeClosed from "../../assets/eye-close.png"
import eyeOpen from "../../assets/eye-open.png"
import { ChangeEvent, useState } from "react";

interface Props {
    handleChange: (e:ChangeEvent<HTMLInputElement>)=>void,
    inputValue: string
}

function ToggleInput({handleChange, inputValue}: Props){
    const ICON_SIZE = "16px";

    const [eyeIconClosed, setEyeIconClosed] = useState<Boolean>(true);

    const handleIconClick = () => {
        setEyeIconClosed(e => !e)
    }


    return <div className="input-box">
        <input type={eyeIconClosed?"password":"text"} placeholder="token" className="token-input" onChange={handleChange} value={inputValue}/>
        {eyeIconClosed?
        <img src={eyeClosed} alt="eye-closed" height={ICON_SIZE} className="input-icon" onClick={handleIconClick}/>:
        <img src={eyeOpen} alt="eye-open" height={ICON_SIZE} className="input-icon" onClick={handleIconClick}/>
    }

    </div>
}

export default ToggleInput;