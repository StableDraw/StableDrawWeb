import React from 'react';
import cl from "../SideBar.module.css";

const Setting = () => {
    return (
        <button className={cl.sidepanel_bottom_button} title="Настройки">
            <img className="sidepanel_bottom_button_img" alt="settings.png" src="settings.png"></img>
        </button>
    );
};

export default Setting;