import React, {useState} from 'react';
import cl from "./PayBtn.module.css";
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Content from './ModalWindow/Content';
import { Link } from 'react-router-dom';




const PayModule = () => {

    const [modal, setModal] = useState(false)

    function showPayModal(){
        setModal(!modal)
    }

    return (
        <div >
            <Modal open= {modal} onClose={showPayModal} className={cl.window}>
                <Content/>
            </Modal>
            <div className={cl.btn}> 
            {/* <Link to='/pay'> */}
            {/* </Link>     */}
            <Button variant="outlined" startIcon={"подписка"} onClick={showPayModal}/>
            </div>
        </div>
    );
};

export default PayModule;