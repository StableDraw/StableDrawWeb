import {useState} from 'react';
import cl from "../SideBar.module.css";
const CloseSideBar = ({children, active}) => {

    const [action, setAction] = useState(active);
    const Action = (e) => {
        e.preventDefault()
        const newActive = cl.close;
        setAction(cl.close)
        active(newActive)
    }
    
    return (
        <button className = {cl.closebtn} onClick={Action} >
            {children}
        </button>
    );
};

export default CloseSideBar;