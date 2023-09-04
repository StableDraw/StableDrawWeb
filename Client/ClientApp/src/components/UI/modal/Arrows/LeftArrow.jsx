import React, {useState} from 'react';
import cl from './LeftArrow.module.css';
import canvasState from "../../../../store/canvasState";
const LeftArrow = () => {
    const Undo = () => {
        canvasState.undo()
    }
    return (
        <div  className={cl.bar} >
             <button onClick={Undo} title={'Отменить'}>
                <img
                    className={cl.arrowsbar_panel_button_image}
                    src={'undo_arrow.png'}
                >
                </img>
            </button>
        </div>
    )
};
export default LeftArrow
