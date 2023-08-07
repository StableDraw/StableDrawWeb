import React from 'react';
import Cl from './ListItemMod.module.css';
const GraphicTable = () => {
    return (
        <button className={Cl.up_btn} id="graphic_tablet" title="Учитывать силу нажатия" style={{ display: "none", position: "fixed", top: "4px", left: "10%" }}>
            <img className={Cl.btnimg} id="graphic_tablet_image" alt="graphic_tablet.png" src="graphic_tablet.png"></img>
        </button>
    );
};

export default GraphicTable;