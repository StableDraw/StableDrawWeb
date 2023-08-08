import React from 'react';
import cl from './Eraser.module.css'

const Eraser = () => {
    return (
        <div className={cl.up_add_window} id="eraser_window" style={{ marginRight: "7.5%", display: "none" }}>
            <div className="eraser_window_thickness_block">
                <img className={cl.thicknessimg} alt="thickness.png" src="thickness.png"></img>
                <input className={cl.up_add_window_slider} type="range" id="e_thickness_sliderValue" min="1" max="100" defaultValue="1"></input>
                <input className={cl.up_add_window_field} type="number" id="e_thickness_rangeValue" min="1" max="100" defaultValue="1"></input>
            </div>
        </div>
    );
};

export default Eraser;