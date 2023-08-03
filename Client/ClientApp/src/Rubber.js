import React, {useCallback} from "react";
import PropTypes from "prop-types";
import {COLOR_MAP, colors} from "./constants";
import cn from "classnames";

function Rubber(props) {
    const RubberOn = useCallback(() => {

    }, [props]);
    <div className="rubber-btn" onClick={RubberOn}>

    </div>

}

Rubber.propTypes = {
    scale: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    onSetMode: PropTypes.func.isRequired,
    onChangeColor: PropTypes.func.isRequired,
    onChangeScale: PropTypes.func.isRequired
};

export default Rubber;
