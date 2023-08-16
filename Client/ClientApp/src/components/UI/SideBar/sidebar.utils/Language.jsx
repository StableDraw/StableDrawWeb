import React from 'react';
import cl from "../SideBar.module.css";
const Language = () => {
    return (
        <button className={cl.sidepanel_bottom_button} title="Язык/language">
            <img className="sidepanel_bottom_button_img" alt="language.png" src="language.png"></img>
        </button>
    );
};
export default Language;