import React, {useMemo, useState} from 'react';
import cl from './ColorPalete.module.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PaleteInput from "./PaleteInput";
let resMemo=[{},{}]
const ColorPalete = ({active, activeBtn, getRes,}) => {
    const [modal, setModal] = useState(false)
    const [colorValue, setColorValue] = useState({id: 'palete', type: 'color', res: "#000000"})
    const rootClass = [cl.myModal]
    const initial_picker = (function () {
        let picker = ("#picker");

        picker.farbtastic("#color");
    })

    if (active==='palete') {
        if (modal) {
            rootClass.push(cl.clr_window)
        }
    }
    console.log(modal)
    const showColorMenuModal = () => {
        setModal(!modal)
    }
    const getColor = (value) => {
        setColorValue(value)
    }
    const getOverColor = useMemo(()=>{
        if (colorValue !==  undefined) {
            if (JSON.stringify(resMemo[0]) !== JSON.stringify(colorValue) ) {
                resMemo =  [colorValue]
                getRes([colorValue])
            }
        }
    },[colorValue])
    return (
        <div style={{width:50, display:'inline'}} onClick={()=>activeBtn('palete')}>
            {/*<div className="cursor">*/}
            {/*    <img className="cursimg" alt="cursimg" style={{ width: "30px", height: "30px" }}></img>*/}
            {/*</div>*/}
            <Stack spacing={1} direction="row">
                <div>
                    <Button sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} visible={modal} setVisible={setModal} variant="contained" onClick={showColorMenuModal} title={'Выбор цвета'}><img src={"palette.png"} alt={"palette"} style={{ width: 30, height: 30}}/> </Button>
                </div>
            </Stack>
            <div className={rootClass.join(' ')} id="clr_window" onMouseLeave={()=> console.log('POSHEL NAHUI')}>
                <PaleteInput id='palete' callback={getColor} type={'color'}/>
                <form action="">
                    <div className="form-item">
                        <label id="text_label_clr" htmlFor="color">
                            Цвет:
                        </label>
                        <input type="text" id="color" name="color" defaultValue="#000000"></input>
                    </div>
                    <div id="picker"></div>
                    <input type="color"/>

                </form>
                <button className={cl.ctype_clr_btn} id="ctype_clr_btn" type="button">
                    Цвет фона
                </button>
                <button className={cl.ok_clr_btn} id="ok_clr_btn" type="button">
                    Сохранить
                </button>
            </div>
        </div>
    );
};
export default ColorPalete;