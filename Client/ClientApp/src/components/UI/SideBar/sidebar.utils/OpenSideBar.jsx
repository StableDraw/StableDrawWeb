import React, {useState} from 'react';
import cl from "../SideBar.module.css";

const OpenSideBar = ({children, active, ...props}) => {
    function Action(e){
        e.preventDefault()
        const newActive = cl.active; /*что передаем */
        active(newActive) /* callback() */
    }
    return (
        <button className={[cl.openbtn].join(" ")} onClick={Action}>
            {children}
        </button>
    );
};

export default OpenSideBar;