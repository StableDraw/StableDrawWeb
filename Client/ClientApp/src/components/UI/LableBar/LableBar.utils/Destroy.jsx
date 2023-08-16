import React, {useState} from 'react';

const Destroy = ({ids, ...props}) => {
    const [id, setid] = useState(props.ids)
    const [item, setId] = useState(ids)
    return (
        <button onClick={() => props.remove(props.item)} className="layer_left_mini_button" id={"destroy_layers_"+item} title="Нахуй слой">
            <img className="layer_left_mini_button_image" alt="destroy.png" src="destroy.png"></img>
        </button>
    );
};
export default Destroy;