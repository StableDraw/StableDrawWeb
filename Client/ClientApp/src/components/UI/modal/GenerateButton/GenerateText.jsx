import React, {useState} from 'react';
import cl from "./GenerateButton.module.css";
const GenerateText = () => {
    return (
        <div className={cl.contentText}>
            <header>
                <div className={cl.header}>
                    <div className={cl.headerText}> Генерация </div>

                </div>
            </header>
        </div>
    );
};
export default GenerateText;