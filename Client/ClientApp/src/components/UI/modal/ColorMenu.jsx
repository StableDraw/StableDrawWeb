import React from 'react';

const ColorMenu = () => {
    return (
        <div className="clr_window" id="clr_window">
            <form action="">
                <div className="form-item">
                    <label id="text_label_clr" htmlFor="color">
                        Цвет:
                    </label>
                    <input type="text" id="color" name="color" defaultValue="#000000"></input>
                </div>
                <div id="picker"></div>
            </form>
            <button className="ctype_clr_btn" id="ctype_clr_btn" type="button">
                Цвет фона
            </button>
            <button className="ok_clr_btn" id="ok_clr_btn" type="button">
                Сохранить
            </button>
        </div>
    );
};

export default ColorMenu;