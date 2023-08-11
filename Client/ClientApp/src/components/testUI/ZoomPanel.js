import React, { useCallback } from "react";
import PropTypes, { InferProps } from "prop-types";

function ZoomPanel(props) {
    const zoomIn = useCallback(() => {
        if (props.scale < 3) {
            props.onChangeScale(0.25);
        }
    }, [props]);

    const zoomOut = useCallback(() => {
        if (props.scale > 0.25) {
            props.onChangeScale(-0.25);
        }
    }, [props]);

    return (
        <div className="zoom-panel">
            <div className="zoom-btn" onClick={zoomIn}>
                +
            </div>
            <div className="zoom-value">{props.scale * 100}%</div>
            <div className="zoom-btn" onClick={zoomOut}>
                -
            </div>
        </div>
    );
}

ZoomPanel.propTypes = {
    scale: PropTypes.number.isRequired,
    onChangeScale: PropTypes.func.isRequired
};

export default ZoomPanel;
