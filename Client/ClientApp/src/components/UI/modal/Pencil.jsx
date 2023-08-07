import React from 'react';

const Pencil = () => {
    return (
        <div className="up_add_window" id="pencil_window" style={{ marginRight: "14.5%", display: "block" }}>
            <div className="pencil_window_thickness_block">
                <img className="thicknessimg" alt="thickness.png" src="thickness.png"></img>
                <input className="up_add_window_slider" type="range" id="thickness_sliderValue" min="1" max="100" defaultValue="1"></input>
                <input className="up_add_window_field" type="number" id="thickness_rangeValue" min="1" max="100" defaultValue="1"></input>
            </div>
            <div className="pencil_window_smoothing_block">
                <img className="smoothingimg" alt="smoothing.png" src="smoothing.png"></img>
                <input className="up_add_window_slider" type="range" id="smoothing_sliderValue" min="0" max="100" defaultValue="0"></input>
                <input className="up_add_window_field" type="number" id="smoothing_rangeValue" min="0" max="100" defaultValue="0"></input>
            </div>
        </div>
    );
};

export default Pencil;