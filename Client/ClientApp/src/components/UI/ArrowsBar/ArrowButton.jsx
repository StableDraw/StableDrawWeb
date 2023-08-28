import React from 'react';
import cl from './ArrowsBar.module.css'
import canvasState from "../../../store/canvasState";

const ArrowButton = ({src, title, click}) => {
   
    
    const Click = () => {
        click()
    }
    
    return (
        <button onClick={Click}   title={title}>
            <img  src={src}></img>
        </button>
    );
};

export default ArrowButton;