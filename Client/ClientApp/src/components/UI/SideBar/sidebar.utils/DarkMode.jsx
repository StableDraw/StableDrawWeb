import React from 'react';
import cl from '../SideBar.module.css'
const DarkMode = () => {
    return (
        <button className={cl.sidepanel_bottom_button} title="Тёмная/светлая тема">
            <img className="sidepanel_bottom_button_img" alt="dark mode.png" src="dark mode.png"></img>
        </button>
    );
};

export default DarkMode;