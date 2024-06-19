import { useState } from "react";
import "./ToggleSwitch.css"
import { ToggleSwitchProps } from "../../typings/ToggleSwitchProps";

function ToggleSwitch({defaultValue, handleClick}:ToggleSwitchProps){
    const [clicked, setClicked] = useState(defaultValue);

    const handleSwitchClick = () => {
        setClicked(e => !e);
        handleClick();
    }

    return <div className={`switch ${clicked?"active":""}`} onClick={handleSwitchClick} title="Availability">
        <div className="circle"></div>
    </div>
}

export default ToggleSwitch;