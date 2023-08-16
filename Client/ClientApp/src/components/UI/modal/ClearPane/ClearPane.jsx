import React, {useState} from 'react';
import cl from './ClearPane.module.css';
import ToolButton from '../../Toolbar/ToolButton';
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
import Content1 from "../../BabylonModule/Content1";
import MyInput from '../../MyInput/MyInput';
const ClearPane = () => {
    const [modal, setModal] = useState(false)

    const showClearPaneModal = () => {
        setModal(!modal)
    }
    return (
        <Stack spacing={1} direction="row">
            <div>
                <Button sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} variant="contained" onClick={showClearPaneModal} title={'Очистка рабочей области'}><img src={"clear.png"} alt={"clear"} style={{ width: 30, height: 30}}/> </Button>
            </div>
        </Stack>
    )
};

export default ClearPane