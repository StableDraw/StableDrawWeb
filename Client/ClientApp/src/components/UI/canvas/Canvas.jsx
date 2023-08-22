import React, {useEffect, useRef, useState} from 'react';
import cl from './Canvas.module.css'
import CanvasState from "../../../store/canvasState";
import toolState from "../../../store/toolState";
import Brush from "../../../tools/Brush";
import CanvasItems from "./CanvasItems";
import canvasState from "../../../store/canvasState";
const Canvas = ({width, height, labelData,canvasDate}) => {
    const [canva, setCanva] = useState([])
    
    const setRef = (ref) => {
        setCanva( [...canva, ref])
        CanvasState.setCanvasList(ref.current)
        CanvasState.setCanvas(CanvasState.getCanvaRef());
        toolState.setTool(new Brush(CanvasState.getCanvasList().at(-1)))


    }
    useEffect(() => {
        CanvasState.setCanvas(CanvasState.getCanvas());
    }, []);
    
    const mouseDownHandler = (e) => {
        CanvasState.pushToUndo(CanvasState.getCanvas().toDataURL())
        labelData(CanvasState.getUndo())
    }
    return (
            <div className={cl.v_frame} onMouseDown={(e) => mouseDownHandler(e)}  style={{width: `calc(${width} + 4px)`, height: `calc(${height} + 4px)`,backgroundColor: "transparent"}}  id="v_frame" >
                {canvasDate.map((item) =>
                    <CanvasItems 
                     style={item.style}
                      id={item.id}
                       height={height}
                        width={width}
                         index={item.index}
                          key={item.id}
                            refs={setRef}/>
                )}
                <div style={{ border: "4px solid rgb(154, 154, 154)",width: `calc(${width} + 8px)`, height: `calc(${height} + 8px)`, zIndex: -1, backgroundImage: "url(alpha_pattern.png)", backgroundRepeat: "repeat", position: "absolute" }}></div>
            </div>
        
    );
};

export default Canvas;