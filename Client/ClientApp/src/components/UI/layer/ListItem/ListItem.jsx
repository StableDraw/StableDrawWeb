import React, {useState} from 'react';
import Visability from "./ListItem.utils/Visability";
import Clear from "./ListItem.utils/Clear";
import Destroy from "../../LableBar/LableBar.utils/Destroy";
import  cl from './ListItem.module.css'
import { useDrag } from '@use-gesture/react'

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
            <div className={cl.layer_button_box}>
                {/* <div {...bingLoyerPos()} style={{*/}
                {/*    position: 'relative',*/}
                {/*    top: logoPos.y,*/}
                {/*    left: logoPos.x,}}>*/}
                {/*</div>*/}
                <Visability ids={props.item.id}/>
                <Clear ids={props.item.id}/>
                <Destroy remove={props.remove} item={props.item}/>
            </div>
            <div className={cl.layer_button} id={"layer_button_"+props.item.id}>
                <div className={cl.layer_display_icon} id={"layer_display_icon_"+props.item.id}>
                    <canvas className={cl.layer_display_canvas} id={"layer_"+props.item.id+"_display_canvas"} style={{ zIndex: 1 }}></canvas>
                    <div className={cl.layer_display_canvas} id={"layer_alpha_img_"+props.item.id} style={{ zIndex: 0, backgroundImage: "url(mini_alpha_pattern.png)", backgroundRepeat: "repeat" }}></div>
                </div>
            </div>
        </div>
    );
};

export default ListItem;