import React, { useState }from 'react';
import cl from './ToolOptionsBar.module.css'
import UploadButton from '../modal/UploadButton/UploadButton';
import SaveButton from '../modal/SaveButton/SaveButton';
import LeftArrow from '../modal/Arrows/LeftArrow';
import RightArrow from '../modal/Arrows/RightArrow';
const ToolOptionsBar = () => {
    return (
        <div>
            <div className={cl.navCanvas}>
                <LeftArrow/>
                <RightArrow/>
                <UploadButton/>
                <SaveButton />
            </div>
        </div>
    );
};

export default ToolOptionsBar;