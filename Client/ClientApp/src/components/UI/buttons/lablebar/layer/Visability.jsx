import React, {useState} from 'react';

const Visability = ({ids, ...props}) => {
    const [item, setId] = useState(ids)
    return (
        <button className="layer_left_mini_button" id={"layer_"+item+"_visibility_button"} title="Включить/выключить видимость">
            <img className="layer_left_mini_button_image" id={"layer_"+item+"_visibility_img"} alt="visibility_on.png" src="visibility_on.png"></img>
        </button>
    );
};

export default Visability;