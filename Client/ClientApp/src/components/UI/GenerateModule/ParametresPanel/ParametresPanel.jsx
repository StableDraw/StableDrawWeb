import React from 'react';
import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import cl from './ParametresPanel.module.css';
const ParametresPanel = ({setModal, props}) => {
    return (
        <div className={cl.contented}>
            <LeftPanel/>
            <RightPanel setModal={setModal}/>
        </div>
    );
};
export default ParametresPanel;