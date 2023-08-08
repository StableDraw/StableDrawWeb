import React, {useState} from 'react';
import Merge from "./LableBar.utils/Merge";
import Swap from "./LableBar.utils/Swap";
import Add from "./LableBar.utils/Add";
import cl from "./LableBar.module.css";
import ListLayers from "../layer/ListLayers/ListLayers.jsx";

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
            <div className="layers_buttons">
                <Merge/>
                <Swap/>
                <Add create={AddNewlabels}/>
            </div>
               <ListLayers layers={layers} remove={Removelabels}/>
        </div>
    );
};

export default LableBar;