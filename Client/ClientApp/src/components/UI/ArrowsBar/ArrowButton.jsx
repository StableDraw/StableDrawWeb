import React from 'react';
import cl from './ArrowsBar.module.css'

const ArrowButton = ({src,visible, setVisible, title}) => {
    const rootClasses =[cl.arrowsbar_panel_button]
    if (visible) {
        rootClasses.push(cl.active)
    }
    return (

        <button onClick={()=>setVisible(!visible)} className={rootClasses.join(' ')} title={title}>
            <img className={cl.arrowsbar_panel_button_image} src={src}></img>
        </button>
    );
};

export default ArrowButton;