import React, {useEffect, useMemo, useRef, useState} from 'react';
import { observer } from 'mobx-react-lite';

import Visability from "./ListItem.utils/Visability";
import Destroy from "../../LableBar/LableBar.utils/Destroy";

import  cl from './ListItem.module.css'

import canvasList from '../../../../store/canvasList.tsx';
import canvasState from '../../../../store/canvasState.tsx';

const ListItem = observer(({item}) => {

    const canvasRef = useRef(null)
    useEffect(() => {
        if (item.active === true) {
            canvasState.canvas = canvasRef.current
            canvasList.setActiveCanvas(canvasRef.current, item.id)
        }
    },[])
    if (item.active === true) {
        canvasList.activeCanvas = canvasRef.current
    }
    // if(item.id === 1) {
    //     canvasList.setActiveCanvas(canvasRef.current, item.id)
    // }
    // const [select, setSelect] = useState(cl.not__selected)

    // useEffect(() => {
    //     CanvasState.selectedContextLabel(CanvasRef.current)
    // }, [])

    /* Сделать для canvas наследование width & height: inherit, а в заливке отриосваного сдлеать ширину и высоту layer_display_icon
    * определяя его через current.width & current.height
    * обязательно обернуть в useMemo
    * */

    // const selectLabel = (e) => {
    //     e.preventDefault()
        
    //     props.defOpacity(
    //         CanvasState.getCanvasList().find(
    //             item => 
    //                 item.attributes[1].value === CanvasRef.current.attributes[1].value
    //         ).style.opacity
    //     )
    //     CanvasState.setLabel(CanvasRef.current.attributes[1].value)
    //     CanvasState.selectedContextLabel(CanvasRef.current)
        
        
    //     toolState.setTool(new Brush(CanvasState.getCanvasList().find(
    //         item => item.attributes[1].value === CanvasRef.current.attributes[1].value
    //         )
    //     ))
        
    //     CanvasState.setCanvas(CanvasState.getCanvasList().find(
    //         item => item.attributes[1].value === CanvasRef.current.attributes[1].value
    //     ));
    //     props.merger(e)
    //     props.mergeCanvas(e)

        
    // }
    const setActiveCanvas = () => {
        // console.log('it works')
        if (item.active === true ) {
            return
        }
        canvasList.setActiveCanvas(canvasRef.current, item.id)
        let image = new Image()
        image.src = canvasList.activeCanvas.toDataURL()
        image.onload = () => {
            // const ctxActive =  canvasList.activeCanvas.getContext("2d")
            const ctxMain = canvasState.canvas.getContext("2d")
           
            ctxMain.clearRect(0,0, ctxMain.canvas.offsetWidth, ctxMain.canvas.offsetHeight)
            ctxMain.drawImage(image, 0, 0, ctxMain.canvas.offsetWidth, ctxMain.canvas.offsetHeight)
      
        }
        canvasState.setCanvas(canvasRef.current)
    }
    
    return (
        <div className={[item.id === canvasList.activeCanvasValue ? cl.layerActive : cl.layer]}
            onClick={()=>setActiveCanvas()}
            //  onClick={(e) => selectLabel(e)}
            //  tabindex={props.index}
             >
            <div className={cl.layer__block}>
                <Visability ids={item.id} />
                {/* Visable={props.Visable} IndexVisable={props.index} */}
                {/*<Clear ids={props.item.id} Clear={props.Clear} IndexClear={props.index}/>*/}
                <div className={cl.layer_display_icon} 
                    // id={"layer_display_icon_"+props.item.id}
                >
                    <canvas
                        ref={canvasRef}
                        id={item.id}
                        className={cl.canvas}
                        >
                  
                    </canvas>
                </div>
                <span className={cl.name}>
                    {/* Layer {props.index + 1} */}
                </span>
            </div>
            <Destroy item={item}/>
        </div>
    );

})

export default ListItem;