import React, {useState} from 'react';
import cl from "./PayBtn.module.css";
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Content from './Content';



const PayModule = () => {

    const [modal, setModal] = useState(false)

    function showPayModal(){
        setModal(!modal)
    }

    return (
        <div>
            <div className={cl.btn}> <Button variant="outlined" startIcon={"PAY"} onClick={showPayModal}/> </div>
            <Modal open= {modal} onClose={showPayModal} className={cl.window}>
                <Content/>
            </Modal>
        </div>
    );
};

export default PayModule;