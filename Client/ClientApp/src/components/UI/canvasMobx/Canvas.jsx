import React, {useEffect, useRef, useState} from 'react'
import { observer } from 'mobx-react-lite'
import cl from './Canvas.module.css'
import canvasState from "../../../store/canvasState.tsx"
import toolState from '../../../store/toolState.tsx'
import Brush from '../../../toolsMobx/Brush'
import canvasList from '../../../store/canvasList.tsx'
const Canvas = observer(() => {
    const width = canvasState.width
    const height = canvasState.height
    const styles = { zIndex: 0, position: "absolute", backgroundColor: "white", touchAction: "none", userSelect: "none" }
    // const setRef = (ref) => {
    //     setCanva( [...canva, ref])
    //     CanvasState.setCanvasList(ref.current)
    //     CanvasState.setCanvas(CanvasState.getCanvaRef());
    //     toolState.setTool(new Brush(CanvasState.getCanvasList().at(-1)))
    // }
    // useEffect(() => {
    //     CanvasState.setCanvas(CanvasState.getCanvas());
    // }, []);

    // const canvasTest = canvasList.activeCanvas
    // const canvasRef = useRef(canvasState.canvas)
    const canvasRef = useRef(null)
    // const canvasRef = useRef(canvasTest)
    // console.log(canvasRef.current)
    // if(canvasRef.current.id) {
    //     console.log(canvasRef.current.id)
    // }
    useEffect(()=>{
        // canvasState.setCanvas(canvasList.activeCanvas)
        // toolState.setTool(new Brush(canvasList.activeCanvas))
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current))
    }, [canvasState.canvas])
    const mouseMoveHandler = (e) => {
        let image = new Image()
        image.src = canvasState.canvas.toDataURL("image/png",0.5)
        // { willReadFrequently: true }
        image.onload = () => {
            const ctx = canvasState.canvas.getContext("2d")
            const ctx2 = canvasList.activeCanvas.getContext("2d")
            
            ctx.clearRect(0,0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight)
            ctx.drawImage(image, 0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight)
            ctx2.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
            ctx2.drawImage(image, 0, 0, ctx2.canvas.width, ctx2.canvas.height)
        }
    }
    let image = new Image()

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasState.canvas.toDataURL())
        image.src = canvasState.canvas.toDataURL()
         // { willReadFrequently: true }
         image.onload = () => {
            const ctx = canvasState.canvas.getContext("2d")

            ctx.clearRect(0,0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight)
            ctx.drawImage(image, 0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight)
        }
        // console.log(image)
        canvasState.setImgSrc(canvasState.canvas.toDataURL())
    }
    return (
            <div 
                className={cl.v_frame} 
                onMouseDown={() => mouseDownHandler()}
                onMouseMove={(e) => mouseMoveHandler(e)}
                style={{width: `${width}px`, height: `${height}px`,backgroundColor: "transparent"}}
                id="v_frame" >
                <canvas
                    ref={canvasRef}
                    // id={canvasState.id}
                    width={`${width}px`}
                    height={`${height}px`}
                    style={styles}
                >
                </canvas>
                <div>
                    {/* // style={{ width: `${width}px`, height: `${height}px`, zIndex: -1, backgroundImage: "url(alpha_pattern.png)", backgroundRepeat: "repeat", position: "absolute" }} */}
                </div>               
            </div>
    )
})
export default Canvas;