import {useState} from 'react';
import ListItem from "../ListItem/ListItem";
import cl from './ListLayers.module.css'

const ListLayers = ({layers, remove, ...props}) => {
    const [layer, setLeyer] = useState()
    
    return (
        <div className={cl.layer_box}>
            {layers.map((item, index) =>
                <ListItem remove={remove} key={item.id} item={item}/>
            )}
        </div>
    );
};

export default ListLayers;