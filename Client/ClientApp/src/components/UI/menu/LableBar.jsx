import React, {useState} from 'react';
import Merge from "../buttons/lablebar/Merge";
import Swap from "../buttons/lablebar/Swap";
import Add from "../buttons/lablebar/Add";
import Destroy from "../buttons/lablebar/Destroy";
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
        <div className="layers">
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