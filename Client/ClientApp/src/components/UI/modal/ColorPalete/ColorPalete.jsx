import React, {useMemo, useState, useRef} from 'react';
import cl from './ColorPalete.module.css'
import Button from '@mui/material/Button';
import PaleteInput from "./PaleteInput";
import useOnClickOutside from "./useOnClickOutside";
import Icon from "@mui/material/Icon";
let resMemo=[{},{}]
const ColorPalete = ({active, activeBtn, getRes,}) => {
    const ref = useRef(null)
    const [message,setMessage]=useState('')
    const handleChange = e => {
        setMessage(e.target.value);
        console.log('value is:', e.target.value);
    };

    const [modal, setModal] = useState(false)
    useOnClickOutside(ref, () => setModal(false));
    const [mode, setMode] = useState(false)
    const [palet, setPalet] = useState(false)
    const [activeModeBtn, setActiveModeBtn] = useState(false)
    const [colorValue, setColorValue] = useState({id: 'palete', type: 'color', res: "#000000"})
    const rootClass = [cl.myModal]

    if (active==='palete') {
        if (modal) {
            rootClass.push(cl.clr_window)
        }
    }
    console.log(modal)
    const handClick = () => {
        setActiveModeBtn(!activeModeBtn)
        setMode(!mode)
    }
    const showColorMenuModal = (e) => {
        setModal(!modal)
        setPalet(!palet)
        e.preventDefault();
        console.log('showColorMenuModal 👉️', colorValue);
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

    const PaleteIcon = (
        <Icon>
            <img src={"paletka.svg"} alt={"paletka"} style={{ width: 30, height: 30}}/>
        </Icon>
    );

    return (
        <div style={{width:50, display:'inline'}} onClick={()=>activeBtn('palete')}>

            {/*<Button sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} visible={modal}*/}
            {/*        setVisible={setModal} variant="contained" onClick={showColorMenuModal} title={'Выбор цвета'}>*/}
            {/*    <label><img src={"palette.png"} alt={"palette"} style={{ width: 30, height: 30}}/>*/}
            {/*        <input type={'color'} style={{hidden: "hidden", maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}}/></label>*/}
            {/*</Button>*/}
            <label title={'Выбор цвета'} style={{background: "#fff", maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}}>
                <input className={cl.colori} type={'color'} onClick={showColorMenuModal} style={{background: "#fff", maxWidth: 0, maxHeight: 0, minWidth: 0, minHeight: 0}}/>
                <img className={cl.imgi} src={"palette.png"} alt={"palette"} style={{ maxWidth: 30, maxHeight: 30, minWidth: 30, minHeight: 30}}/>
            </label>
            <div className={rootClass.join(' ')} id="clr_window" onMouseLeave={()=> console.log('yes')}>
                <header>
                    <div className={cl.header}>
                        <div className={cl.headerText}>Выбрать цвет</div>
                    </div>
                </header>
                {/*<input className={cl.colorPalete} type="color" style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}}/>*/}
                <PaleteInput id='palete' callback={getColor} type={'color'}/>

                <Button className={cl.ctype_clr_btn} id="ctype_clr_btn" type="button" onClick={handClick} style={{backgroundColor: activeModeBtn ? "#fff" : "#000", fontSize: 10, color: activeModeBtn ? "#000" : "#fff"}}>
                    {mode && "Цвет фона"}
                    {!mode && "Цвет кисти"}
                </Button>
                <Button className={cl.ok_clr_btn} id="ok_clr_btn" type="button" onClick={(modal)=>setModal(!modal)} style={{backgroundColor: "#000", fontSize: 10, color: "#fff"}}>Сохранить</Button>
            </div>
        </div>
    );
};
export default ColorPalete;