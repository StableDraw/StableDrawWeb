import {React, useState} from 'react';
import cl from './Eraser.module.css'
import ToolButton from '../../Toolbar/ToolButton';
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
import MyInput from '../../MyInput/MyInput';
import toolState from "../../../../store/toolState";
import canvasState from "../../../../store/canvasState";
import Erar from "../../../../tools/Eraser"

const Eraser = ({active, activeBtn, getRes,}) => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    
    if(active==='eraser') {
        if(modal) {
            rootClass.push(cl.up_add_window)
        }
    }
    
    const Eraser = () => {
        toolState.setTool(new Erar(canvasState.canvas))
        activeBtn('eraser')
        setModal(!modal)
    }
    return (
        <div style={{width:50, display:'inline'}} onClick={Eraser}>
         
          
                <Button sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} visible={modal} setVisible={setModal} variant="contained" title={'Ластик'}><img src={"eraser.png"} alt={"eraser"} style={{ width: 30, height: 30}}/> </Button>


            <div className={rootClass.join(' ')} id="eraser_window">
                <div className="eraser_window_thickness_block">
                    <MyInput id='eraser'  imgPath={"thickness.png"} type={'thickness'} imgClass={cl.thicknessimg}/>
                </div>
            </div>
        </div>
    );
};

export default Eraser;