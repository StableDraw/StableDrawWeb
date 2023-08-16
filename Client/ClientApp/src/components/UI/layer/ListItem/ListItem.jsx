import React, {useState} from 'react';
import Visability from "./ListItem.utils/Visability";
import Clear from "./ListItem.utils/Clear";
import Destroy from "./ListItem.utils/Destroy";
import  cl from './ListItem.module.css'
import ButtonGroup from '@mui/material/ButtonGroup';
const ListItem = (props) => {
    const [isHovering, setIsHovering] = useState(true);
    // const [logoPos, setLogoPos] = useState({x:0, y:0});

    // const bingLoyerPos = useDrag((params)=>{
    //     setLogoPos({
    //         x: params.offset[0],
    //         y: params.offset[1],
    //     });
    // });
    function someHandler() {setIsHovering(false);};
    function handleMouseOut() {setIsHovering(true);};
    return (
        <div className={cl.layer} id={props.item.id} onMouseOver={someHandler} onMouseOut={handleMouseOut}>
            <ButtonGroup orientation="vertical" sx={{display: 'flex'}}>
                <Visability ids={props.item.id}/>
                <Clear ids={props.item.id} Clear ={props.Clear}/>
            </ButtonGroup>

            <div className="layer_button" id={"layer_button_"+props.item.id}>
                <div className={cl.right_shift} hidden = {isHovering}> <Destroy remove={props.remove} item={props.item}/> </div>

                <div className={cl.layer_display_icon} id={"layer_display_icon_"+props.item.id}>
                    <canvas className="layer_display_canvas" id={"layer_"+props.item.id+"_display_canvas"} style={{ zIndex: 1 }}></canvas>
                    <div className="layer_display_canvas" id={"layer_alpha_img_"+props.item.id} style={{ zIndex: 0, background: props.drawingsArr[0], backgroundRepeat: "repeat" }}></div>
                </div>
            </div>
        </div>
    );
};
export default ListItem;