import React, { useState, useRef, useCallback } from 'react';
import cl from './ToolBar.module.css';
import Pencil from '../modal/Pencil/Pencil';
import Eraser from '../modal/Eraser/Eraser';
import ColorPalete from '../modal/ColorPalete/ColorPalete';
import Pipette from '../modal/Pipette/Pipette';
import Bucket from '../modal/Bucket/Bucket';
import ClearPane from '../modal/ClearPane/ClearPane';
import UploadButton from '../modal/UploadButton/UploadButton';
import SaveButton from '../modal/SaveButton/SaveButton';
import ToolButton from './ToolButton';
import GenerateButton from '../modal/GenerateButton/GenerateButton';
import ArrowsBar from "../ArrowsBar/ArrowsBar";


const ToolBar = ({getRes}) => {
    const [activeBtn, setActiveBtn] = useState(null)
    return (
        <div className={cl.t}>
            <div className={cl.bar}>
                <div className={cl.arrowsbar_panel_button}>
                    <ArrowsBar/>
                </div>
            </div>
            <div className={cl.nav}>
                <div className={cl.side_panel_button}>
                   
                    <Pencil 
                        getRes={getRes}
                        activeBtn={setActiveBtn}
                        active={activeBtn}
                    />
                    <Eraser 
                        getRes={getRes}
                        activeBtn={setActiveBtn}
                        active={activeBtn}
                    />
                    <ColorPalete 
                        getRes={getRes}
                        activeBtn={setActiveBtn}
                        active={activeBtn}
                    />
                    <Pipette/>
                    <Bucket />
                    <ClearPane/>
                    <UploadButton/>
                    <SaveButton />
                    <GenerateButton />
                </div>
            </div>
        </div>
    );
};

export default ToolBar;