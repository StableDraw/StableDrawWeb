import React, {useState} from 'react';
import cl from './Pipette.module.css'
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
import Content1 from "../../BabylonModule/Content1";
const Pipette = () => {
    const [modal, setModal] = useState(false)
    const showPipetteModal = () => {
        setModal(!modal)
    }
    return (
        <Stack spacing={1} direction="row">
            <div>
                <Button sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} variant="contained" onClick={showPipetteModal} title={'Пипетка'}><img src={"pipette.png"} alt={"pipette"} style={{ width: 30, height: 30}}/> </Button>
            </div>
        </Stack>
    )
};

export default Pipette