import React from 'react';
import Cl from './ListItemMod.module.css';

const ColorMenu = () => {
    return (
        <div className={Cl.clr_w} id="clr_window">
            <form action="">
                <div className="form-item">
                    <label id="text_label_clr" htmlFor="color">
                        Цвет:
                    </label>
                    <input type="text" id="color" name="color" defaultValue="#000000"></input>
                </div>
                <div id="picker"></div>
            </form>
            <button className={Cl.ctype_clr} id="ctype_clr_btn" type="button">
                Цвет фона
            </button>
            <button className={Cl.clr_btn} id="ok_clr_btn" type="button">
                Сохранить
            </button>
        </div>
    );
};

export default ColorMenu;