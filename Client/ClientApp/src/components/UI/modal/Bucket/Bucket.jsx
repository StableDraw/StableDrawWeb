import React, {useState} from 'react';
import cl from './Bucket.module.css'
import ToolButton from '../../Toolbar/ToolButton';
import MyInput from '../../MyInput/MyInput';
const Bucket = () => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    if(modal) {
        rootClass.push(cl.up_add_window)
    }
    return (
        <div style={{width:50, display:'inline'}}>
            <ToolButton src={'bucket.png'} visible={modal} setVisible={setModal} title={'Заливка'}/>
            <div className={rootClass.join(' ')} id="bucket">
            </div>
        </div>
    )

};

export default Bucket