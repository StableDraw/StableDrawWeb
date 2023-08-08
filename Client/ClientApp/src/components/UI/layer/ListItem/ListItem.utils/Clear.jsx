import React, {useState} from 'react';

const Clear = ({ids, ...props}) => {
    
    const [item, setId] = useState(ids)
    return (
        <button className="layer_left_mini_button" id={"clear_layer_"+item} title="Очистить слой">
            <img className="layer_left_mini_button_image" alt="clear.png" src="clear.png"></img>
        </button>
    );
};

export default Clear;