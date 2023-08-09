import React, {useState} from 'react';
import cl from "./PayWindow.module.css";
import CloseBtn from './components/closeBtn';

const PayWindow = (props) => {
const [isHovering, setIsHovering] = useState(true);

function someHandler() {setIsHovering(false);};
function handleMouseOut() {setIsHovering(true);};
    return (
        <div className={cl.window} hidden = {props.visible} onMouseOver={someHandler} onMouseOut={handleMouseOut}>
           <CloseBtn visible = {isHovering}/>
        </div>
    );
};

export default PayWindow;