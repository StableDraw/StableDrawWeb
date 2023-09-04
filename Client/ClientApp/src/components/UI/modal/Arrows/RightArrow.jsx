import React from 'react';
import cl from './RightArrow.module.css';
import canvasState from "../../../../store/canvasState";
const RightArrow = () => {
    const Redo = () => {
        canvasState.redo()
    }
    return (
        <div className={cl.bar} >
            <button onClick={Redo} title={'Повторить'}>
                <img
                    className={cl.arrowsbar_panel_button_image}
                    src={'repeat_arrow.png'}
                >
                </img>
            </button>
        </div>
    )
};
export default RightArrow
