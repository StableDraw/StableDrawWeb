import React, {useState} from 'react';
import cl from "./PayBtn.module.css";
import PayWindow from '../../../order/PayWindow';


const ToolBar = () => {

const [modal, setModal] = useState(true)

function showPayModal(){
    if(!modal) setModal(true)
    else setModal(false)
}

    return (
        <div>
            <div onClick={showPayModal} className={cl.btn}> {modal} </div>
            <PayWindow visible = {modal}/>
        </div>
    );
};

export default ToolBar;