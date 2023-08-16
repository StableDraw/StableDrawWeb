import React, {useState} from 'react';
import cl from './RightArrow.module.css';
import ArrowButton from '../../ArrowsBar/ArrowButton';
const RightArrow = () => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    if (modal) {
        rootClass.push(cl.up_add_window)
    }
    return (
        <div style={{width:24, height: 20, display:'inline-block'}}>
            <ArrowButton src={'repeat_arrow.png'} visible={modal} setVisible={setModal} title={'Повторить'}/>
            <div className={rootClass.join(' ')} id="arrow_next">
            </div>
        </div>
    )
};
export default RightArrow
