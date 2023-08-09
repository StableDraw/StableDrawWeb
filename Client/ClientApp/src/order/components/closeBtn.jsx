import React, {useState} from 'react';
import cl from "./../PayWindow.module.css";
const CloseBtn = (props) => {

function hideWindow(){
    
}
    return (
        <button onClick={hideWindow} className={cl.CloseBtn} hidden = {props.visible}>
           x
        </button>
    );
};

export default CloseBtn;