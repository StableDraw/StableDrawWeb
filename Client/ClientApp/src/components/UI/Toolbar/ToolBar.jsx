import React, { useState } from 'react';
import cl from './ToolBar.module.css';
import Pencil from '../modal/Pencil/Pencil';
import Eraser from '../modal/Eraser/Eraser';
import ColorPalete from '../modal/ColorPalete/ColorPalete';
import Pipette from '../modal/Pipette/Pipette';
import Bucket from '../modal/Bucket/Bucket';
import ClearPane from '../modal/ClearPane/ClearPane';
import GenerateButton from '../modal/GenerateButton/GenerateButton';



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
                <Bucket />
                <ClearPane/>
                {/*<GenerateButton />*/}
            </div>
        </div>

    );
};

export default ToolBar;