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
import LeftArrow from '../modal/Arrows/LeftArrow';
import RightArrow from '../modal/Arrows/RightArrow';


const ToolBar = () => {
    const [activeBtn, setActiveBtn] = useState(null)
    return (

        <div className={cl.nav}>
            <div className={cl.side_panel_button}>         
                <Pencil
                    activeBtn={setActiveBtn}
                    active={activeBtn}
                />
                <Eraser 
                    activeBtn={setActiveBtn}
                    active={activeBtn}
                />
                <ColorPalete 
                    activeBtn={setActiveBtn}
                    active={activeBtn}
                />
                <Pipette/>
                <Bucket />
                <ClearPane/>
                <GenerateButton />
            </div>
        </div>
      
    );
};

export default ToolBar;