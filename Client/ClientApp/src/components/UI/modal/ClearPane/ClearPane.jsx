import React, {useState} from 'react';
import cl from './ClearPane.module.css';
import ToolButton from '../../Toolbar/ToolButton';
import MyInput from '../../MyInput/MyInput';
const ClearPane = () => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    if(modal) {
        rootClass.push(cl.up_add_window)
    }
    return (
        <div style={{width:50, display:'inline'}}>
            <ToolButton src={'clear.png'} visible={modal} setVisible={setModal} title={'Очистка рабочей области'}/>
            <div className={rootClass.join(' ')} id="clear">
            </div>
        </div>
    )

};

export default ClearPane