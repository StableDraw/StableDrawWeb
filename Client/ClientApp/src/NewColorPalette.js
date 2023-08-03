import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./styles.css";
import {ReactComponent as ColorPaletteIcon } from "./icons/color_palette.svg";

const NewColorPalette = () => {

    const [clicked, setClicked] = useState(false);
    const [checked, setChecked] = useState("clr_window1");
    return (
        <button
            onClick={() => {
                setChecked("clr_window1");
                setClicked(true);
            }}
            onAnimationEnd={() => setClicked(false)}
            className={cn("like-button-wrapper", {
                checked,
                clicked,
            })}

        >

                    <ColorPaletteIcon/>

                    <div className="clr_window1" id="clr_window1">
                        <form action="">
                            <div className="form-item">
                                <label id="text_label_clr1" htmlFor="color">
                                    Цвет:
                                </label>
                                <input type="text" id="color" name="color" defaultValue="#000000"></input>
                            </div>
                            <div id="picker"></div>
                        </form>
                        <button className="ctype_clr_btn1" id="ctype_clr_btn1" type="button">
                            Цвет фона
                        </button>
                        <button className="ok_clr_btn1" id="ok_clr_btn1" type="button">
                            Сохранить
                        </button>
                    </div>


        </button>
    );
}



export default NewColorPalette;
