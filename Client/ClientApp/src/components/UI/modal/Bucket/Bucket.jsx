import React, {useState} from 'react';
import cl from './Bucket.module.css'
import ToolButton from '../../Toolbar/ToolButton';
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
import MyInput from '../../MyInput/MyInput';
import Content1 from "../../BabylonModule/Content1";
const Bucket = () => {
    const [modal, setModal] = useState(false)
    
    function showBucketModal(){
        setModal(!modal)
    }
    return (
        <Stack spacing={1} direction="row">
            <div>
                <Button sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} variant="contained" onClick={showBucketModal} title={'Заливка'}><img src={"bucket.png"} alt={"bucket"} style={{ width: 30, height: 30}}/> </Button>
                {/*<Modal open={modal} onClose={showBucketModal} className={cl.window}>*/}
                {/*    <Content1/>*/}
                {/*</Modal>*/}
            </div>
        </Stack>
    )
};

export default Bucket