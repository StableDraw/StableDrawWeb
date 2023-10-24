import React, {useState} from 'react';
import cl from "./BabylonBtn.module.css";
import { Modal } from '@mui/material';

import Content1 from './Content1';



const BabylonModule = () => {

    const [modal, setModal] = useState(false)

    function showBabylonModal(){
        setModal(!modal)
    }

    return (
        
        <a className={cl.button} onClick={showBabylonModal}>
            <p>3D модуль</p>
            <Modal open= {modal} onClose={showBabylonModal} className={cl.window}>
                <Content1/>
            </Modal>
        </a>
            
    );
};

export default BabylonModule;