import React, {useState} from 'react';
import cl from './UploadButton.module.css'
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
import Content1 from "../../BabylonModule/Content1";

import { createTheme } from '@mui/material/styles';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { withStyles } from 'material-ui/styles';

const UploadButton = () => {
    const [modal, setModal] = useState(false)
    // const rootClass = [cl.myModal]
    // if(modal) {
    //     rootClass.push(cl.up_add_window)
    // }
    // if (actived) {
    //     rootClass.push(cl.active)
    // }
    // else {
    //     rootClass.push(cl.unactive)
    // }
    // <div style={{width:50, display:'inline'}}>
    //     <ToolButton src={'upload.png'} visible={modal} setVisible={setModal} title={'Загрузить изображение на сайт'} isVisibleClass={cl.active} isInvisibleClass={cl.unactive}/>
    //     <div className={rootClass.join(' ')} id="upload">
    //         <input className={cl.hiddenInput} type="file" accept="image/*,.png,.jpg,.gif,.web,.bmp" id="my_hidden_file" name="loadfile"></input>
    //     </div>
    // </div>
    function showUploadModal(){
        setModal(!modal)
    }

    return (
        <Stack spacing={1} direction="row">
            <div>
                <Button sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} variant="contained" onClick={showUploadModal} title={'Загрузить изображение на сайт'}><img src={"upload.png"} alt={"upload"} style={{ width: 30, height: 30}}/> </Button>
                <Modal open={modal} onClose={showUploadModal} className={cl.window}>
                    <Content1/>
                </Modal>
            </div>
        </Stack>
    )

};

export default UploadButton;