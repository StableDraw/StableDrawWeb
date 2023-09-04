import React, {useState} from 'react';
import cl from "./PayBtn.module.css";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
const PayModule = () => {

    const [modal, setModal] = useState(false)

    const showPayModal = () => {
        setModal(!modal)
    }

    return (
        <div >
            <div className={cl.btn}> 
            <Link to='/pay'>
                <Button variant="outlined" startIcon={"подписка"} onClick={showPayModal}/>
            </Link>    
            </div>
        </div>
    );
};

export default PayModule;