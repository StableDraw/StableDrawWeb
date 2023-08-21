import React from 'react';
import cl from './ButtonComponent.module.css';
const ButtonComponent = () => {
    return (
        <div className={cl.container}>
            <img
                src={"quest.png"}
                alt={"quest"}
                style={{width: 8, height: 8, borderRadius:100}}
            />
        </div>
    );
};

export default ButtonComponent;