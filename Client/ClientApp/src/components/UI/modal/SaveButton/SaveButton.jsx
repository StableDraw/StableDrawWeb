import React, {useState} from 'react';
import cl from './SaveButton.module.css'
import ToolButton from '../../Toolbar/ToolButton';
import MyInput from '../../MyInput/MyInput';
const SaveButton = () => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    if(modal) {
        rootClass.push(cl.up_add_window)
    }
    return (
        <div style={{width:50, display:'inline'}}>
            <ToolButton src={'save.png'} visible={modal} setVisible={setModal} title={'Сохранить изображение'}/>
            <div className={rootClass.join(' ')} id="save">
            </div>
        </div>
    )

};

export default SaveButton