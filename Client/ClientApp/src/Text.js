import React from "react";
import PropTypes from "prop-types";
import {colors, COLOR_MAP} from "./constants";
import {TEXT_SIZE, textsizes} from "./constants";
import cn from "classnames";

function Text(props) {
    return(
        <div className="text_button">
            {/*{colors.map(colorKey => (*/}
            {/*    <div*/}
            {/*        key={colorKey}*/}
            {/*        className={cn("color-item", {*/}
            {/*            selected: colorKey === props.color*/}
            {/*        })}*/}
            {/*        onClick={() => {*/}
            {/*            props.onChangeColor(colorKey);*/}
            {/*        }}*/}
            {/*    />*/}
            {/*))}*/}
            {textsizes.map(sizeKey => (
                <div
                    key={sizeKey}
                    className={cn("size-item", {
                        selected: sizeKey === props.size
                    })}
                    // style={{ siz: TEXT_SIZE[sizeKey] }}
                    onClick={() => {
                        props.onChangeSize(sizeKey);
                    }}
                />
            ))}
        </div>
    )
}

Text.propTypes = {
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    onChangeColor: PropTypes.func.isRequired,
    onChangeSize: PropTypes.func.isRequired
};

export default Text;
