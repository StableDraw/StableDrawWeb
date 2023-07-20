import React, {useState} from 'react';

const Add = ({create}) => {
    const [label, NewLabel] = useState({})
    
    const AddNewlabels = (e) => {
        e.preventDefault()
        const newLayer = {
            ...label, id: Date.now()
        }
        create(newLayer)
        NewLabel({})
    }
    // console.log(create)
    return (
        <button onClick={AddNewlabels} className="layers_mini_button" id="add_layers" title="Добавить слой">
            <img className="layers_mini_button_image" alt="swap.png" src="plus.png"></img>
        </button>
    );
};

export default Add;