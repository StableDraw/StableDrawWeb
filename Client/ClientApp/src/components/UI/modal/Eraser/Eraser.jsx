﻿import {React, useState} from 'react';
import cl from './Eraser.module.css'
import ToolButton from '../../Toolbar/ToolButton';
import MyInput from '../../MyInput/MyInput';

const Eraser = ({setRes}) => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    if(modal) {
        rootClass.push(cl.up_add_window)
    }
    return (
        <div style={{width:50, display:'inline'}}>
            <ToolButton src={'eraser.png'} visible={modal} setVisible={setModal} title={'Ластик'}/>
            <div className={rootClass.join(' ')} id="eraser_window">
                <div className="eraser_window_thickness_block">
                    <MyInput id='eraser' callback={setRes} imgPath={"thickness.png"} type={'thickness'} imgClass={cl.thicknessimg}/>
                </div>
            </div>
        </div>
    );
};

export default Eraser;