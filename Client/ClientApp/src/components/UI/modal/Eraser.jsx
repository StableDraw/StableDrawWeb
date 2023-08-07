import React from 'react';

const Eraser = () => {
    return (
        <div className="up_add_window" id="eraser_window" style={{ marginRight: "7.5%", display: "none" }}>
            <div className="eraser_window_thickness_block">
                <img className="thicknessimg" alt="thickness.png" src="thickness.png"></img>
                <input className="up_add_window_slider" type="range" id="e_thickness_sliderValue" min="1" max="100" defaultValue="1"></input>
                <input className="up_add_window_field" type="number" id="e_thickness_rangeValue" min="1" max="100" defaultValue="1"></input>
            </div>
        </div>
    );
};

export default Eraser;