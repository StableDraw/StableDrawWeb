import React, { useState }from 'react';
import cl from './ToolOptionsBar.module.css'
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