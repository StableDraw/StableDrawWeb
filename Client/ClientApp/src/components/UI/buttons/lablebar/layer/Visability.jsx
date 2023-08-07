import React, {useState} from 'react';

const Visability = ({ids, ...props}) => {
    const [item, setId] = useState(ids)
    const [img, setImg] = useState("visibility_on.png")

    function handle() {
        if(img === "visibility_on.png"){
            setImg("visibility_off.png")
        }
        else {
            setImg("visibility_on.png")
        }
    }

    return (
        <button onClick={handle} className="layer_left_mini_button" id={"layer_"+item+"_visibility_button"} title="Включить/выключить видимость">
            <img className="layer_left_mini_button_image" id={"layer_"+item+"_visibility_img"} alt={img} src= {img} ></img>
        </button>
    );
};

export default Visability;