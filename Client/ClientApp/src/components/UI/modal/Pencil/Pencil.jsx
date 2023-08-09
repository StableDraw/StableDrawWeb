import React, {useState} from 'react';
import cl from './Pencil.module.css'
import ToolButton from '../../Toolbar/ToolButton';
import MyInput from '../../MyInput/MyInput';
const Pencil = ({isActive}) => {
    const [modal, setModal] = useState(false)
    const [thicknessValue, setThicknessValue] = useState(1)
    const rootClass = [cl.myModal]
    const pencil_w = document.getElementById("pencil_window");
    if(modal) {
        rootClass.push(cl.up_add_window)
    } 
    return (
        <div style={{width:50, display:'inline'}}>
            <ToolButton src={'pencil.png'} visible={modal} setVisible={setModal} title={'Карандаш'}/>
            <div className={rootClass.join(' ')} id="pencil_window">
                <div className="pencil_window_thickness_block">
                    <MyInput imgPath={"thickness.png"} imgClass={cl.thicknessimg}/>
                </div>
                <div className="pencil_window_smoothing_block"> 
                    <MyInput  imgPath={"smoothing.png"} imgClass={cl.smoothingimg}/>
                </div>
            </div>
        </div>
    )
    
};

export default Pencil;