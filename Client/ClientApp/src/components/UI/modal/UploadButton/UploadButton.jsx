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

    const showUploadModal = () => {
        setModal(!modal)
    }

    return (
        <Stack spacing={1} direction="row">
            <div>
                <Button sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} variant="contained" onClick={showUploadModal} title={'Загрузить изображение на сайт'}><img src={"upload.png"} alt={"upload"} style={{ width: 30, height: 30}}/> </Button>
            </div>
        </Stack>
    )

};

export default UploadButton;