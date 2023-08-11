import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { colors, COLOR_MAP } from "./constants";

function ColorPalette(props) {
    return (
        <div className="color-palette">
            {colors.map(colorKey => (
                <div
                    key={colorKey}
                    className={cn("color-item", {
                        selected: colorKey === props.color
                    })}
                    style={{ backgroundColor: COLOR_MAP[colorKey] }}
                    onClick={() => {
                        props.onChangeColor(colorKey);
                    }}
                />
            ))}
        </div>
    );
}

ColorPalette.propTypes = {
    color: PropTypes.string.isRequired,
    onChangeColor: PropTypes.func.isRequired
};

export default ColorPalette;
