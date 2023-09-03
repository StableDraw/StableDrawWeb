import React, {useEffect, useMemo, useRef, useState} from 'react';
import Visability from "./ListItem.utils/Visability";
import Clear from "./ListItem.utils/Clear";
import Destroy from "../../LableBar/LableBar.utils/Destroy";
import  cl from './ListItem.module.css'
import CanvasState from "../../../../store/canvasState";
import toolState from "../../../../store/toolState";
import Brush from "../../../../tools/Brush";
import canvasState from "../../../../store/canvasState";
import ButtonGroup from '@mui/material/ButtonGroup';

const ListItem = (props) => {
    const CanvasRef = useRef(null)
    const [select, setSelect] = useState(cl.not__selected)

    useEffect(() => {
        CanvasState.selectedContextLabel(CanvasRef.current)
    }, [])

    /* Сделать для canvas наследование width & height: inherit, а в заливке отриосваного сдлеать ширину и высоту layer_display_icon
    * определяя его через current.width & current.height
    * обязательно обернуть в useMemo
    * */

    const selectLabel = (e) => {
        e.preventDefault()
        CanvasState.setLabel(CanvasRef.current.attributes[1].value)
        CanvasState.selectedContextLabel(CanvasRef.current)
        toolState.setTool(new Brush((CanvasState.getCanvasList().find(item => item.attributes[1].value === CanvasRef.current.attributes[1].value))))
        CanvasState.setCanvas(CanvasState.getCanvasList().find(item => item.attributes[1].value === CanvasRef.current.attributes[1].value));
        props.merger(e)
        props.mergeCanvas(e)
    }
    const selected = () => {
        
    }
    
    return (
        <div className={[cl.layer, cl.selected].join(" ")} id={props.item.id}

             onClick={selectLabel}>
            <ButtonGroup orientation="vertical" sx={{display: 'flex'}}>
                <Visability ids={props.item.id} Visable={props.Visable} IndexVisable={props.index}/>
                <Clear ids={props.item.id} Clear={props.Clear} IndexClear={props.index}/>
            </ButtonGroup>
            <div className={cl.layer_button} id={"layer_button_"+props.item.id}>
                <div className={cl.layer_display_icon} id={"layer_display_icon_"+props.item.id}>
                    <Destroy deleteCanva={props.deleteCanva} indexDelete={props.index} remove={props.remove} item={props.item}/>
                    <div className={cl.layer_display_icon} id={"layer_display_icon_"+props.item.id}>
                        <canvas
                            ref={CanvasRef}
                            id={"layer_"+props.item.id+"_display_canvas"}
                            index={props.index}
                            style={{ zIndex: props.index }}>
                        </canvas>
                    </div>
                    {/*<div className={cl.layer_display_canvas} id={"layer_alpha_img_"+props.item.id} style={{ zIndex: 0, backgroundImage: "url(mini_alpha_pattern.png)", backgroundRepeat: "repeat" }}></div>*/}
                </div>
            </div>
        </div>
    );

};

export default ListItem;