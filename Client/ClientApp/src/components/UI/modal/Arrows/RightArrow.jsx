import React, {useState} from 'react';
import cl from './RightArrow.module.css';
import ArrowButton from '../../ArrowsBar/ArrowButton';
import MyInput from '../../MyInput/MyInput';
import Bucket from "../Bucket/Bucket";
import canvasState from "../../../../store/canvasState";
const RightArrow = () => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    if(modal) {
        rootClass.push(cl.up_add_window)
    }
    const Redo = () => {
        canvasState.redo()
    }
    return (
        <div style={{width:24, height: 20, display:'inline-block'}}>
            <ArrowButton  click={Redo} src={'repeat_arrow.png'} visible={modal} setVisible={setModal} title={'Повторить'}/>
            <div className={rootClass.join(' ')} id="arrow_next">
            </div>
        </div>
    )

};
export default RightArrow
