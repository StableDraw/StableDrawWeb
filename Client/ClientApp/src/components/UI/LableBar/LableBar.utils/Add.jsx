import React, {useState} from 'react';
import cl from "../LableBar.module.css";
import AddIcon from '@mui/icons-material/Add';
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
        <button onClick={AddNewlabels} className={cl.layers_mini_button} id="add_layers" title="Добавить слой">
            <AddIcon sx={{ fontSize: 20 }}/>
        </button>
    );
};

export default Add;