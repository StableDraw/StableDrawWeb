import React from 'react';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import cl from "../LableBar.module.css";

const Merge = () => {
    return (
        <button className={cl.layers_mini_button} id="merge_layers" title="Объединить слои">
            <MergeTypeIcon sx={{ fontSize: 20 }}/>
        </button>
    );
};

export default Merge;