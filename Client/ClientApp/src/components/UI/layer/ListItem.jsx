import React, {useState} from 'react';
import Visability from "../buttons/lablebar/layer/Visability";
import Clear from "../buttons/lablebar/layer/Clear";
import Destroy from "../buttons/lablebar/Destroy";

const ListItem = (props) => {
    const [isHovering, setIsHovering] = useState(true);

    function someHandler() {setIsHovering(false);};
    function handleMouseOut() {setIsHovering(true);};

    return (
        <div className="layer" id={props.item.id} onMouseOver={someHandler} onMouseOut={handleMouseOut}>
            <div className="layer_button_box">
                <Visability ids={props.item.id}/>
                <Clear ids={props.item.id}/>
                <div className='right_shift' hidden = {isHovering}>
<<<<<<< HEAD
                    <Destroy remove={props.remove} item={props.item}/>
=======
                            <Destroy remove={props.remove} item={props.item}/>
>>>>>>> f1508366e1130bd19519dd6f5339e549472fcd6d
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