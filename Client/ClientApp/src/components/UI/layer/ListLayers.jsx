import React, {useState} from 'react';
import ListItem from "./ListItem";

const ListLayers = ({layers, remove, ...props}) => {
    const [layer, setLeyer] = useState()
    return (
        <div className="layer_box">
            {layers.map((item, index) =>
                <ListItem remove={remove} key={item.id} item={item}/>
            )}
        </div>
    );
};

export default ListLayers;