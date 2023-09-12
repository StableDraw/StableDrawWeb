import React, { useState }from 'react';
import cl from './ToolOptionsBar.module.css'
import UploadButton from '../modal/UploadButton/UploadButton';
import SaveButton from '../modal/SaveButton/SaveButton';
import GenerateButton from '../modal/GenerateButton/GenerateButton';
import LeftArrow from '../modal/Arrows/LeftArrow';
import RightArrow from '../modal/Arrows/RightArrow';


const ToolOptionsBar = () => {
    const [activeBtn, setActiveBtn] = useState(null)
    return (
            <div className={cl.navCanvas}>
              <div className={cl.flex}>
                  <LeftArrow/>
                  <RightArrow/>
              </div>
            </div>
    );
};

export default ToolOptionsBar;