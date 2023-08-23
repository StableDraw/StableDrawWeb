import React, {useEffect, useRef} from 'react';
import cl from './Canvas.module.css'
import CanvasState from "../../../store/canvasState";
import toolState from "../../../store/toolState";
import Brush from "../../../tools/Brush";
const Canvas = ({width, height}) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        CanvasState.setCanvas(canvasRef.current);
        toolState.setTool(new Brush(canvasRef.current))
    }, []);

    const mouseDownHandler = () => {
        CanvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    return (
        <div className={cl.d_frame} id="d_frame">
            <div className={cl.v_frame}  id="v_frame">
                <canvas
                    onMouseDown={() => mouseDownHandler()} 
                    ref={canvasRef}
                    width={width}
                    height={height} 
                    className={cl.drawfield} 
                    id="canvas_background" 
                    style={{ zIndex: 8 }}>
                </canvas>
            </div>
        </div>
    );
};

export default Canvas;