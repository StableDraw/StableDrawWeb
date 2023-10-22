import React, {useEffect, useRef, useState} from 'react';
import Visability from "./ListItem.utils/Visability";
import Destroy from "../../LableBar/LableBar.utils/Destroy";
import cl from './ListItem.module.css'
import CanvasState from "../../../../store/canvasState";
import toolState from "../../../../store/toolState";
import Brush from "../../../../tools/Brush";

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
        
        props.defOpacity(
            CanvasState.getCanvasList().find(
                item => 
                    item.attributes[1].value === CanvasRef.current.attributes[1].value
            ).style.opacity
        )
        CanvasState.setLabel(CanvasRef.current.attributes[1].value)
        CanvasState.selectedContextLabel(CanvasRef.current)
        
        
        toolState.setTool(new Brush(CanvasState.getCanvasList().find(
            item => item.attributes[1].value === CanvasRef.current.attributes[1].value
            )
        ))
        
        CanvasState.setCanvas(CanvasState.getCanvasList().find(
            item => item.attributes[1].value === CanvasRef.current.attributes[1].value
        ));
        props.merger(e)
        props.mergeCanvas(e)

        
    }
    
    return (
        <div className={[cl.layer].join(" ")} id={props.item.id}
             onClick={(e) => selectLabel(e)}
             tabindex={props.index}>
            <div className={cl.layer__block}>
                <Visability ids={props.item.id} Visable={props.Visable} IndexVisable={props.index}/>
                {/*<Clear ids={props.item.id} Clear={props.Clear} IndexClear={props.index}/>*/}
                <div className={cl.layer_display_icon} id={"layer_display_icon_"+props.item.id}>
                    <canvas
                        ref={CanvasRef}
                        id={"layer_"+props.item.id+"_display_canvas"}
                        index={props.index}
                        width="50px"
                        height="28px"
                        style={{ zIndex: props.index, width: "50px", height: "28px", background: "#FFFFFF" }}>
                    </canvas>
                </div>
                <span className={cl.name}>
                    Layer {props.index + 1}
                </span>
            </div>
            <Destroy deleteCanva={props.deleteCanva} indexDelete={props.index} remove={props.remove} item={props.item}/>
        </div>
    );

};

export default ListItem;