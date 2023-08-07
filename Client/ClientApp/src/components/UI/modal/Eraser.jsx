import React from 'react';
import Cl from './ListItemMod.module.css';
const Eraser = () => {
    return (
        <div className= {Cl.add_w} id="eraser_window" style={{ marginRight: "7.5%", display: "none" }}>
            <div className="eraser_window_thickness_block">
                <img className={Cl.thick} alt="thickness.png" src="thickness.png"></img>
                <input className={Cl.w_slider} type="range" id="e_thickness_sliderValue" min="1" max="100" defaultValue="1"></input>
                <input className={Cl.w_field} type="number" id="e_thickness_rangeValue" min="1" max="100" defaultValue="1"></input>
            </div>
        </div>
    );
};

export default Eraser;