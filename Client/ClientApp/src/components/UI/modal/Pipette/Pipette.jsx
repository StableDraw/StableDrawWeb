import React, {useState} from 'react';
import cl from './Pipette.module.css'
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
import Content1 from "../../BabylonModule/Content1";
const Pipette = () => {
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
    //     <ToolButton src={'pipette.png'} visible={modal} setVisible={setModal} title={'Пипетка'} isVisibleClass={cl.active} isInvisibleClass={cl.unactive}/>
    //     <div className={rootClass.join(' ')} id="pipette">
    //     </div>
    // </div>
    function showPipetteModal(){
        setModal(!modal)
    }
    return (
        <Stack spacing={1} direction="row">
            <div>
                <Button sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} variant="contained" onClick={showPipetteModal} title={'Пипетка'}><img src={"pipette.png"} alt={"pipette"} style={{ width: 30, height: 30}}/> </Button>
                <Modal open={modal} onClose={showPipetteModal} className={cl.window}>
                    <Content1/>
                </Modal>
            </div>
        </Stack>
    )
};

export default Pipette