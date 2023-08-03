import React, {useState} from 'react';
import classes from '../../SideBar.module.css'

const OpenSideBar = ({children, active, ...props}) => {
    
    const [action, setAction] = useState(active);
    function Action(e){
        e.preventDefault()
        const newActive = classes.active; /*что передаем */
        setAction(active)
        active(newActive) /* callback() */

    }

    return (
        <button className={[classes.openbtn, action].join(" ")} onClick={Action}>
            {children}
        </button>
    );
};

export default OpenSideBar;