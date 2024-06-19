import { useState } from "react";
import "./MenuLines.css"
import { MenuLinesProps } from "../../../typings/MenuLinesProps";


function MenuLines({handleClick}:MenuLinesProps){
    const [line1, setLine1] = useState(false);
    const [line2, setLine2] = useState(false);
    const [line3, setLine3] = useState(false);

    const handleMenuClick = () => {
        setLine1(e => !e);
        setLine2(e => !e);
        setLine3(e => !e);
        handleClick();
    }

    return <div className="menu-lines" onClick={handleMenuClick}>
        <div className={`line ${line1?"l-rot45r":""}`}></div>
        <div className={`line ${line2?"shrink":""}`}></div>
        <div className={`line ${line3?"l-rot45l":""}`}></div>
    </div>
}

export default MenuLines;