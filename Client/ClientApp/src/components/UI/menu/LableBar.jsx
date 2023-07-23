import React, {useState} from 'react';
import Merge from "../buttons/lablebar/Merge";
import Swap from "../buttons/lablebar/Swap";
import Add from "../buttons/lablebar/Add";
import cl from "./ListItemMenu.module.css";
import ListLayers from "../layer/ListLayers";

const LableBar = () => {
    const [layers, SetLayer] = useState([
        {id: Date.now()}
    ])
    const AddNewlabels = (newLayer) => {
        SetLayer([...layers, newLayer])
    }
    const Removelabels = (layer) => {
        SetLayer(layers.filter(l => l.id !== layer.id))
    }
    
    return (
        <div className={cl.layers}>
            <div className={cl.layers_buttons}>
                <Merge/>
                <Swap/>
                <Add create={AddNewlabels}/>
            </div>
               <ListLayers layers={layers} remove={Removelabels}/>
        </div>
    );
};

export default LableBar;