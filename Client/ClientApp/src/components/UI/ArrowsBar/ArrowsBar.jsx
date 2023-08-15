import React from 'react';
import cl from './ArrowsBar.module.css';
import LeftArrow from "../modal/Arrows/LeftArrow";
import RightArrow from "../modal/Arrows/RightArrow";

const ArrowsBar = (sost,setSost) => {

    return (
        <div className={cl.bar}>
            <div className={cl.arrowsbar_icon_buttons}>
               
                <LeftArrow/>
                <RightArrow/>
                
            </div>
        </div>
    );
};

export default ArrowsBar;