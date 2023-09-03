import React, {useState} from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import  cl from '.././ListItem.module.css'
const Clear = ({ids,Clear,IndexClear}) => {
    
    const ClearCanvas = () => {
        Clear(IndexClear)
    }
    return (
        <button className={cl.layer_left_mini_button} onClick={ClearCanvas} id={"clear_layer_"+ids} title="Очистить слой">
            <DeleteOutlineIcon sx={{ fontSize: 20 }}/>
        </button>
    );
};

export default Clear;