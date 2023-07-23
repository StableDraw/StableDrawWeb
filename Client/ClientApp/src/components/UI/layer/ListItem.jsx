import React from 'react';
import Visability from "../buttons/lablebar/layer/Visability";
import Clear from "../buttons/lablebar/layer/Clear";
import Destroy from "../buttons/lablebar/Destroy";
import Cl from "./ListItemL.module.css"

const ListItem = (props) => {
    // console.log(props)
    return (
        <div className={Cl.layer} id={props.item.id}>
            <div className={Cl.layer_button}>
                <Visability ids={props.item.id}/>
                <Clear ids={props.item.id}/>
                <Destroy remove={props.remove} item={props.item}/>
            </div>
            <div className={Cl.lb} id={"layer_button_"+props.item.id}>
                <div className={Cl.ldi} id={"layer_display_icon_"+props.item.id}>
                    <canvas className={Cl.ldc} id={"layer_"+props.item.id+"_display_canvas"} style={{ zIndex: 1 }}></canvas>
                    <div className={Cl.ldc} id={"layer_alpha_img_"+props.item.id} style={{ zIndex: 0, backgroundImage: "url(mini_alpha_pattern.png)", backgroundRepeat: "repeat" }}></div>
                </div>
            </div>
        </div>
    );
};

export default ListItem;