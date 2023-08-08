import React, {useState} from 'react';

const Destroy = (props) => {
    const [id, setid] = useState(props.ids)
    
    return (
        <button onClick={() => props.remove(props.item)} className="layer_left_mini_button" id="destroy_layers" title="Нахуй слой">
            <img className="layers_mini_button_image" alt="swap.png" src="Plus.png"></img>
        </button>
    );
};

export default Destroy;