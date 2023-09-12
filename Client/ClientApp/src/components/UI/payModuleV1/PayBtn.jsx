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
            <Link to='/pay' className={cl.button} onClick={showPayModal}>
                <p>
                    Подписка
                </p>
            </Link>
    );
};

export default PayModule;