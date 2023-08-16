import React, {useState} from 'react';
import cl from './SaveButton.module.css'
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
import Content1 from "../../BabylonModule/Content1";
const SaveButton = () => {
    const [modal, setModal] = useState(false)
    const showSaveButtonModal = () => {
        setModal(!modal)
    }
    return (
            <Stack spacing={1} direction="row">
                <div>
                    <Button sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} variant="contained" onClick={showSaveButtonModal} title={'Сохранить изображение'}><img src={"save.png"} alt={"save"} style={{ width: 30, height: 30}}/> </Button>
                </div>
            </Stack>
    )
};
export default SaveButton