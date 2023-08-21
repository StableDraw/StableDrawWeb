import React, {useState} from 'react';
import cl from "./LeftPanel.module.css";
import ContentTest from "./ContentTest";
const LeftPanel = () => {
    return (
        <div className={cl.leftpanel}>
            <div className={cl.content}>
                <div className={cl.agreeWindow}>
                    <input
                        className={cl.searcher}
                        type="text"
                        id="name"
                        name="name"
                        required minLength="1"
                        maxLength="100"
                        size="100"
                    />
                    <hr className={cl.hrLine}/>
                    <ContentTest/>
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;