import React, {useState} from 'react';

const Destroy = ({ids,deleteCanva,indexDelete, ...props}) => {
    const [id, setid] = useState(props.ids)
    const [item, setId] = useState(ids)
    // console.log(props.item) //id
    const Destroy = () => {
        props.remove(props.item)
        deleteCanva(indexDelete)
    }
    return (
        <button onClick={Destroy} className="layer_left_mini_button" id={"destroy_layers_"+item} title="Нахуй слой">
            <img className="layer_left_mini_button_image" alt="destroy.png" src="destroy.png"></img>
        </button>
    );
};

export default Destroy;