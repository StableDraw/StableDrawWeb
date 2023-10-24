import React, {useEffect, useState} from 'react';
import cl from './Canvas.module.css'
import CanvasState from "../../../store/canvasState";
import toolState from "../../../store/toolState";
import Brush from "../../../tools/Brush";
import CanvasItems from "./CanvasItems";
import {observer} from "mobx-react";
const Canvas = observer(({width, height, labelData,canvasDate, mergeRes}) => {
    const [canva, setCanva] = useState([])
    console.log('render')
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

        let image = new Image()
        image.src = CanvasState.getCanvas().toDataURL()
        image.onload = () => {
            const ctx = CanvasState.getSelectContextLabel().getContext("2d", { willReadFrequently: true })
            // console.log(ctx.canvas.offsetWidth)
            ctx.clearRect(0,0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight)
            ctx.drawImage(image, 0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight)
        }
    }
    
   
    return (
            <div className={cl.v_frame} onMouseDown={(e) => mouseDownHandler(e)}  
                 style={{width: `${width}px`, height: `${height}px`,backgroundColor: "transparent"}}  id="v_frame" >
                
                {canvasDate.map((item) =>
                    <CanvasItems
                     styles={item.style}
                      id={item.id}
                       height={height}
                        width={width}
                         index={item.index}
                          key={item.id}
                            refs={setRef}/>
                )}
                
                <div 
                    style={{ width: `${width}px`, height: `${height}px`, zIndex: -1, backgroundImage: "url(alpha_pattern.png)", backgroundRepeat: "repeat", position: "absolute" }}>
                    
                </div>
                
            </div>

    );
});

export default Canvas;