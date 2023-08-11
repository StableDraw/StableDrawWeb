import React from 'react';
import cl from './ToolBar.module.css'

const ToolButton = ({src,visible, setVisible, title, setActive}) => {
    const rootClasses =[cl.up_panel_button]
    if (visible) {
        rootClasses.push(cl.active)
    }
    const show = ()=> {
        
    }
    return (
        <button onClick={()=>setVisible(!visible)} className={rootClasses.join(' ')} id="arrow_back" title={title}>
            <img className={cl.up_panel_button_image} id="arrow_back_image" src={src}></img>
        </button>
    );
};

export default ToolButton;