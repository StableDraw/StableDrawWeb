import React, {useEffect, useRef} from 'react';
import CanvasState from "../../../store/canvasState";
import toolState from "../../../store/toolState";
import Brush from "../../../tools/Brush";

const CanvasItems = ({width, height, style, index, id ,labelData, refs}) => {
    const canvasRef = useRef(null)
    useEffect(() => {
        refs(canvasRef)
    }, []);
    return (
        <canvas
            ref={canvasRef}
            id={id}
            index={index}
            width={width}
            height={height}
            style={style}>
        </canvas>
    );
};

export default CanvasItems;