import React, {useState} from 'react';
import cl from './Pencil.module.css'

const Pencil = () => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    const pencil_w = document.getElementById("pencil_window");
    if(modal) {
        rootClass.push(cl.up_add_window)
    } 
    return (
        <div style={{width:50, display:'inline'}}>
            <button className="up_panel_button" id="pencil" title="Карандаш" onClick={()=>setModal(true)}>
                <img className="up_panel_button_image" id="pencil_image" alt="pencil.png" src="pencil.png"/>    
            </button>
            <div className={rootClass.join(' ')} id="pencil_window" onClick={() => setModal(false)}>
            <div className="pencil_window_thickness_block">
                <img className={cl.thicknessimg} alt="thickness.png" src="thickness.png"></img>
                <input className={cl.up_add_window_slider} type="range" id="thickness_sliderValue" min="1" max="100" defaultValue="1"></input>
                <input className={cl.up_add_window_field} type="number" id="thickness_rangeValue" min="1" max="100" defaultValue="1"></input>
            </div>
            <div className="pencil_window_smoothing_block">
                <img className={cl.smoothingimg} alt="smoothing.png" src="smoothing.png"></img>
                <input className={cl.up_add_window_slider} type="range" id="smoothing_sliderValue" min="0" max="100" defaultValue="0"></input>
                <input className={cl.up_add_window_field} type="number" id="smoothing_rangeValue" min="0" max="100" defaultValue="0"></input>
            </div>
            </div>
        </div>
    )
    
};

export default Pencil;