import React from 'react';
import Visability from "../buttons/lablebar/layer/Visability";
import Clear from "../buttons/lablebar/layer/Clear";
import Destroy from "../buttons/lablebar/Destroy";
import Cl from "./ListItem.module.css"

const ListItem = (props) => {
    // console.log(props)
    return (
        <div className={Cl.layer} id={props.item.id}>
            <div className={Cl.layer_button_box}>
                <Visability ids={props.item.id}/>
                <Clear ids={props.item.id}/>
                <Destroy remove={props.remove} item={props.item}/>
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