import React from 'react';
import cl from "./LabelTB.module.css";

const ToolButtons = (props) => {
    return (
        <button className={cl.up_panel_button} id="arrow_back" title={"Отменить"}>
            <img className={cl.up_panel_button_image} id="arrow_back_image" alt="undo_arrow.png" src="undo_arrow.png"></img>
        </button>
    );
};

export default ToolButtons;