import React from 'react';
import Cl from './ListItemMod.module.css';
const Pencil = () => {
    //.smoothing && .thicknessimg идентичны
    return (
        <div className={Cl.add_w} id="pencil_window" style={{ marginRight: "14.5%", display: "block" }}>
            <div className="pencil_window_thickness_block">
                <img className={Cl.thick} alt="thickness.png" src="thickness.png"></img>
                <input className={Cl.w_slider} type="range" id="thickness_sliderValue" min="1" max="100" defaultValue="1"></input>
                <input className={Cl.w_field} type="number" id="thickness_rangeValue" min="1" max="100" defaultValue="1"></input>
            </div>
            <div className="pencil_window_smoothing_block">
                <img className={Cl.thick} alt="smoothing.png" src="smoothing.png"></img> 
                <input className={Cl.w_slider} type="range" id="smoothing_sliderValue" min="0" max="100" defaultValue="0"></input>
                <input className={Cl.w_field} type="number" id="smoothing_rangeValue" min="0" max="100" defaultValue="0"></input>
            </div>
        </div>
    );
};

export default Pencil;