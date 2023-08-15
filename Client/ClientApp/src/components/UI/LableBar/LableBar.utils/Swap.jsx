import React from 'react';
import cl from "../LableBar.module.css";
import MergeTypeIcon from '@mui/icons-material/MergeType';

const Swap = () => {
    return (
        <button className={cl.layers_mini_button}  id="swap_layers" title="Поменять слои местами">
            <MergeTypeIcon sx={{ fontSize: 20 }}/>
        </button>
    );
};

export default Swap;