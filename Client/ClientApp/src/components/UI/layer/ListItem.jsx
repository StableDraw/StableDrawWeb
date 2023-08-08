import React, {useState} from 'react';
import Visability from "../buttons/lablebar/layer/Visability";
import Clear from "../buttons/lablebar/layer/Clear";
import Destroy from "../buttons/lablebar/Destroy";
import { useDrag } from '@use-gesture/react'



const ListItem = (props) => {
    const [isHovering, setIsHovering] = useState(true);
    const [logoPos, setLogoPos] = useState({x:0, y:0});

    // const bingLoyerPos = useDrag((params)=>{
    //     setLogoPos({
    //         x: params.offset[0],
    //         y: params.offset[1],
    //     });
    // });

    function someHandler() {setIsHovering(false);};
    function handleMouseOut() {setIsHovering(true);};

    return (
        <div className="layer" id={props.item.id} onMouseOver={someHandler} onMouseOut={handleMouseOut}>
            <div className="layer_button_box">
                {/* <div {...bingLoyerPos()} style={{*/}
                {/*    position: 'relative',*/}
                {/*    top: logoPos.y,*/}
                {/*    left: logoPos.x,}}>*/}
                {/*</div>*/}
                <Visability ids={props.item.id}/>
                <Clear ids={props.item.id}/>
                <div className='right_shift' hidden = {isHovering}>
                    <Destroy remove={props.remove} item={props.item}/>

                </div>
            </div>

            <div className="layer_button" id={"layer_button_"+props.item.id}>
                <div className="layer_display_icon" id={"layer_display_icon_"+props.item.id}>
                    <canvas className="layer_display_canvas" id={"layer_"+props.item.id+"_display_canvas"} style={{ zIndex: 1 }}></canvas>
                    <div className="layer_display_canvas" id={"layer_alpha_img_"+props.item.id} style={{ zIndex: 0, backgroundImage: "url(mini_alpha_pattern.png)", backgroundRepeat: "repeat" }}></div>
                </div>
            </div>
        </div>
    );
};

export default ListItem;