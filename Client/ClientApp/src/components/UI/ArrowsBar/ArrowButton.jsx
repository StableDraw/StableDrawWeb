import React from 'react';
import cl from './ArrowsBar.module.css'
import canvasState from "../../../store/canvasState";

const ArrowButton = ({src,visible, setVisible, title, click}) => {
    const rootClasses =[cl.arrowsbar_panel_button]
    if (visible) {
        rootClasses.push(cl.active)
    }
    
    const Click = () => {
        click()
        setVisible(!visible)
    }
    
    return (

        <button onClick={Click}  className={rootClasses.join(' ')} title={title}>
            <img className={cl.arrowsbar_panel_button_image} src={src}></img>
        </button>
    );
};

export default ArrowButton;