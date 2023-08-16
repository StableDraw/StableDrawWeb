import {useState} from 'react';
import ListItem from "../ListItem/ListItem";
import cl from './ListLayers.module.css'
const ListLayers = ({drawingsArr, layers, remove, ...props}) => {
    const [layer, setLayer] = useState()
    return (
        <div className={cl.layer_box}>
            {layers.map((item, index) =>
                <ListItem drawingsArr={drawingsArr} Clear={props.Clear} remove={remove} key={item.id} item={item}/>
            )}
        </div>
    );
};
export default ListLayers;