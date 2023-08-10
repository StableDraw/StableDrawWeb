import React, {useState} from 'react';
import cl from './Pencil.module.css'
import ToolButton from '../../Toolbar/ToolButton';
import MyInput from '../../MyInput/MyInput';
const Pencil = ({isActive,  setRes}) => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    if(modal) {
        rootClass.push(cl.up_add_window)
    }
    return (
        <div style={{width:50, display:'inline'}}>
            <ToolButton src={'pencil.png'} visible={modal} setVisible={setModal} title={'Карандаш'}/>
            <div className={rootClass.join(' ')} id="pencil_window">
                <div className="pencil_window_thickness_block">
                    <MyInput  id='pencil' callback={setRes} imgPath={"thickness.png"} type={'thickness'} imgClass={cl.thicknessimg}/>
                </div>
                <div className="pencil_window_smoothing_block"> 
                    <MyInput id='pencil' callback={setRes} imgPath={"smoothing.png"} type={'smoothing'} imgClass={cl.smoothingimg}/>
                </div>
            </div>
        </div>
    )
    
};

export default Pencil;