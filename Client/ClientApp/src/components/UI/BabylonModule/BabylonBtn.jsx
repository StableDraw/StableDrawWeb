import React, {useState} from 'react';
import cl from "./BabylonBtn.module.css";
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Content1 from './Content1';

const BabylonModule = () => {
    const [modal, setModal] = useState(false)
    const showBabylonModal = () => {
        setModal(!modal)
    }
    return (
        <div>
            <div className={cl.btn}>
                <Button
                    variant="contained"
                    startIcon={"3d модуль"}
                    onClick={showBabylonModal}
                />
            </div>
            <Modal
                open={modal}
                onClose={showBabylonModal}
                className={cl.window}
            >
                <Content1/>
            </Modal>
        </div>
    );
};

export default BabylonModule;