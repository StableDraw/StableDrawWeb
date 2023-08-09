import React, {useState} from 'react';
import cl from './GenerateButton.module.css'
import ToolButton from '../../Toolbar/ToolButton';
import MyInput from '../../MyInput/MyInput';
const GenerateButton = () => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    if(modal) {
        rootClass.push(cl.up_add_window)
    }
    return (
        <div style={{width:50, display:'inline'}}>
            <ToolButton src={'generate.png'} visible={modal} setVisible={setModal} title={'ИИ обработка'} data-toggle={"gen_modal"}/>
            <div className={rootClass.join(' ')} id="generate">
            </div>
        </div>
    )

};

export default GenerateButton