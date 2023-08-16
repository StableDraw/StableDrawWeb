import React, {useState} from 'react';
import cl from './Eraser.module.css'
import Button from '@mui/material/Button';
import MyInput from '../../MyInput/MyInput';
const Eraser = ({active, activeBtn, getRes,}) => {
    // console.log(setActive)
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    if (active==='eraser') {
        if (modal) {
            rootClass.push(cl.up_add_window)
        }
    }
    const showEraserModal = () => {
        setModal(!modal)
    }
    return (
        <div style={{width:50, display:'inline'}} onClick={()=>activeBtn('eraser')}>
            <div>
                <Button sx={{background: "#fff"}} style={{maxWidth: 50, maxHeight: 50, minWidth: 50, minHeight: 50}} visible={modal} setVisible={setModal} variant="contained" onClick={showEraserModal} title={'Ластик'}><img src={"eraser.png"} alt={"eraser"} style={{ width: 30, height: 30}}/> </Button>
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