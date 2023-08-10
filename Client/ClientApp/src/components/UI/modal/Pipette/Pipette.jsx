import React, {useState} from 'react';
import cl from './Pipette.module.css'
import ToolButton from '../../Toolbar/ToolButton';
import MyInput from '../../MyInput/MyInput';
const Pipette = () => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    if(modal) {
        rootClass.push(cl.up_add_window)
    }
    return (
        <div style={{width:50, display:'inline'}}>
            <ToolButton src={'pipette.png'} visible={modal} setVisible={setModal} title={'Пипетка'}/>
            <div className={rootClass.join(' ')} id="pipette">
            </div>
        </div>
    )

};

export default Pipette