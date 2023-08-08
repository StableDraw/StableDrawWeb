import React, {useState} from 'react';
import cl from "../SideBar.module.css";

const OpenSideBar = ({children, active, ...props}) => {
    
    const [action, setAction] = useState(active);
    function Action(e){
        e.preventDefault()
        const newActive = cl.active; /*что передаем */
        setAction(active)
        active(newActive) /* callback() */

    }

    return (
        <button className={[cl.openbtn, action].join(" ")} onClick={Action}>
            {children}
        </button>
    );
};

export default OpenSideBar;