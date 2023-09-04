import React, {useState,useMemo} from 'react';
import cl from './Pencil.module.css'
import ToolButton from '../../Toolbar/ToolButton';
import MyInput from '../../MyInput/MyInput';
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
import toolState from "../../../../store/toolState";
import Brush from "../../../../tools/Brush";
import canvasState from "../../../../store/canvasState";
const Pencil = ({active, activeBtn}) => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    if(active==='pencil') {
        if(modal) {
            rootClass.push(cl.up_add_window)
        }
    }

    const showPencilModal = () => {
        setModal(!modal)
    }
    const CallPencil = () => {
        showPencilModal()
        toolState.setTool(new Brush(canvasState.getCanvas()))
        activeBtn('pencil')
        console.log(modal)
    }
    return (
        <div style={{width:50, display:'inline'}}>
            <Stack spacing={1} direction="row">
                    <Button 
                        sx={{background: "#fff"}} 
                        style={{
                            maxWidth: 50,
                            maxHeight: 50,
                            minWidth: 50,
                            minHeight: 50,
                        }}
                        visible={modal}
                        variant="contained"
                        title={'Карандаш'} 
                        onClick={CallPencil}>
                        <img src={"pencil.png"} 
                            alt={"pencil"} 
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        /> 
                    </Button>
            </Stack>
            <div className={rootClass.join(' ')} id="pencil_window">
                <MyInput
                    imgPath={"thickness.png"}
                    type={'thickness'}
                    imgClass={cl.thicknessimg}
                />
            </div>
        </div>
    )

};

export default Pencil;