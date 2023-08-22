import React, {createElement, useState} from 'react';
import cl from './ColorPalete.module.css'
import Stack from '@mui/material/Stack';
import toolState from "../../../../store/toolState";
import Label from "@mui/material/InputLabel";
const ColorPalete = ({active, activeBtn, getRes,}) => {
    const [modal, setModal] = useState(false)

    const rootClass = [cl.myModal]

    if(active==='palete') {
        if(modal) {
            rootClass.push(cl.clr_window)
        }
    }
    const changeColor = (e) => {
        toolState.setStrokeColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }

    return (
        <div style={{width:50, display:'inline'}} onClick={()=>activeBtn('palete')}>
            <div className="cursor">
                <img className="cursimg" alt="cursimg" style={{ width: "30px", height: "30px" }}></img>
            </div>
            <Stack spacing={1} direction="row">
                <div>
                    <Label className={cl.label__color} sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} variant="contained" title={'Выбор цвета'}><img src={"palette.png"} alt={"palette"} style={{ width: 30, height: 30}}/> <input type="color" className={cl.color} onChange={e => changeColor(e)}/></Label>
                </div>
                
            </Stack>

        </div>
    );
};
export default ColorPalete;