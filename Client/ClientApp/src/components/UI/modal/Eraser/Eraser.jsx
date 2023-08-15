import {React, useState} from 'react';
import cl from './Eraser.module.css'
import ToolButton from '../../Toolbar/ToolButton';
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
import MyInput from '../../MyInput/MyInput';

const Eraser = ({actived, onChanged,setActive,getRes, ...props}) => {
    // console.log(setActive)
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    if(modal) {
        rootClass.push(cl.up_add_window)
    }
    // if (actived) {
    //     rootClass.push(cl.active)
    // }
    // else {
    //     rootClass.push(cl.unactive)
    // }
    function showEraserModal(){
        setModal(!modal)
    }
    return (
        <div style={{width:50, display:'inline'}}>
            {/*<ToolButton src={'eraser.png'} visible={modal} setVisible={setModal} title={'Ластик'} isVisibleClass={cl.active} isInvisibleClass={cl.unactive}/>*/}

            <div>
                <Button sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} visible={modal} setVisible={setModal} variant="contained" onClick={showEraserModal} title={'Ластик'}><img src={"eraser.png"} alt={"eraser"} style={{ width: 30, height: 30}}/> </Button>
                    {/*<Modal open={modal} onClose={showColorMenuModal} className={cl.window}>*/}
                    {/*    <Content1/>*/}
                    {/*</Modal>*/}
            </div>

            <div className={rootClass.join(' ')} id="eraser_window">
                <div className="eraser_window_thickness_block">
                    <MyInput id='eraser' callback={getRes} imgPath={"thickness.png"} type={'thickness'} imgClass={cl.thicknessimg}/>
                </div>
            </div>
        </div>
    );
};

export default Eraser;