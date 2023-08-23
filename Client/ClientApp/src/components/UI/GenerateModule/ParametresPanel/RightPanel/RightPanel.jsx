import React, {useState} from 'react';
import cl from "./RightPanel.module.css";
import ParamsWindow from "./ParamsWindow/ParamsWindow";
const RightPanel = ({setModal, props}) => {
    
    return (
        <div className={cl.paramsWindow}>
            <ParamsWindow setModal={setModal}/>
        </div>
    );
};

export default RightPanel;