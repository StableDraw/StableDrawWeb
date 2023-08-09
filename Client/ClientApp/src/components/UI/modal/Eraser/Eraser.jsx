import React, {useState} from 'react';
import cl from './Eraser.module.css'

const Eraser = () => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal1]
    if(modal) {
        rootClass.push(cl.up_add_window)
    }
    return (
        <div style={{width:50, display:'inline'}}>
            <button className="up_panel_button" id="eraser" title="Ластик"  onClick={()=>setModal(true)}>
                <img className="up_panel_button_image" id="eraser_image" alt="eraser.png" src="eraser.png"/>
            </button>
            <div className={rootClass.join(' ')} id="eraser_window" onClick={() => setModal(false)}>
            <div className="eraser_window_thickness_block">
                <img className={cl.thicknessimg} alt="thickness.png" src="thickness.png"></img>
                <input className={cl.up_add_window_slider} type="range" id="thickness_sliderValue" min="1" max="100" defaultValue="1"></input>
                <input className={cl.up_add_window_field} type="number" id="thickness_rangeValue" min="1" max="100" defaultValue="1"></input>
            </div>
            </div>
        </div>
    );
};

export default Eraser;