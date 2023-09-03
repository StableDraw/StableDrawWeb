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
    const [isHovering, setIsHovering] = useState(true);
    const CanvasRef = useRef(null)


    if (props.canva) {
        let image = new Image()
        image.src = props.canva
        image.onload = () => {
            CanvasRef.current.getContext("2d", { willReadFrequently: true }).clearRect(0,0, 290, 148)
            CanvasRef.current.getContext("2d", { willReadFrequently: true }).drawImage(image, 0, 0, 290, 148)
        }
    }


    const selectLabel = (e) => {
        e.preventDefault()
        CanvasState.setLabel(CanvasRef.current.attributes[1].value)
        toolState.setTool(new Brush((CanvasState.getCanvasList().find(item => item.attributes[1].value === CanvasRef.current.attributes[1].value))))
        CanvasState.setCanvas(CanvasState.getCanvasList().find(item => item.attributes[1].value === CanvasRef.current.attributes[1].value));
    }

    function someHandler() {setIsHovering(false);};
    function handleMouseOut() {setIsHovering(true);};
    return (
        <div className={cl.layer} id={props.item.id}
             onMouseOver={someHandler}
             onMouseOut={handleMouseOut}
             onClick={selectLabel}>
            <ButtonGroup orientation="vertical" sx={{display: 'flex'}}>
                <Visability ids={props.item.id}/>
                <Clear ids={props.item.id}/>
            </ButtonGroup>
            <div className={cl.layer_button} id={"layer_button_"+props.item.id}>

                    <Destroy deleteCanva={props.deleteCanva} indexDelete={props.index} remove={props.remove} item={props.item}/>
                    <div className={cl.layer_display_icon} id={"layer_display_icon_"+props.item.id}>
                        <canvas
                            className={cl.konvo}
                            ref={CanvasRef}
                            // className={cl.layer_display_canvas}
                            id={"layer_"+props.item.id+"_display_canvas"}
                            index={props.index}
                            style={{ zIndex: props.index}}>
                        </canvas>
                    </div>
                    {/*<div className={cl.layer_display_canvas} id={"layer_alpha_img_"+props.item.id} style={{ zIndex: 0, backgroundImage: "url(mini_alpha_pattern.png)", backgroundRepeat: "repeat" }}></div>*/}
            </div>
        </div>
    );
};

export default ListItem;