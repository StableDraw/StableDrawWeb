import React from 'react';

const GraphicTable = () => {
    return (
        <button className="up_panel_button" id="graphic_tablet" title="Учитывать силу нажатия" style={{ display: "none", position: "fixed", top: "4px", left: "10%" }}>
            <img className="up_panel_button_image" id="graphic_tablet_image" alt="graphic_tablet.png" src="graphic_tablet.png"></img>
        </button>
    );
};

export default GraphicTable;