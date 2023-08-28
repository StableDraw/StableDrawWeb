import React, {useState} from 'react';
import cl from './GenerateButton.module.css';
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
import GenerateContent from "./GenerateContent";
import ToolButton from '../../Toolbar/ToolButton';
import MyInput from '../../MyInput/MyInput';
const GenerateButton = () => {
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
    //     <ToolButton src={'generate.png'} visible={modal} setVisible={setModal} title={'ИИ обработка'} data-toggle={"gen_modal"} isVisibleClass={cl.active} isInvisibleClass={cl.unactive}/>
    //     <div className={rootClass.join(' ')} id="generate">
    //     </div>
    // </div>
    function showGenerateModal(){
        setModal(!modal)
    }

    return (
        <Stack spacing={1} direction="row">
            <div>
                <Button sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} variant="contained" onClick={showGenerateModal}
                        title={'ИИ обработка'}><img src={"generate.png"} alt={"generate"} style={{ width: 30, height: 30}}/> </Button>
                <Modal open={modal} onClose={showGenerateModal} className={cl.window}>
                    <GenerateContent/>
                </Modal>
            </div>
        </Stack>
    )
};

export default GenerateButton