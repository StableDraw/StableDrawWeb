import React, {useState} from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import  cl from '.././ListItem.module.css'
const Clear = ({ids, ...props}) => {
    const [item, setId] = useState(ids)
    return (
        <button
            className={cl.layer_left_mini_button}
            onClick={props.Clear}
            id={"clear_layer_"+item}
            title="Очистить слой"
        >
            <DeleteOutlineIcon sx={{ fontSize: 20 }}/>
        </button>
    );
};

export default Clear;