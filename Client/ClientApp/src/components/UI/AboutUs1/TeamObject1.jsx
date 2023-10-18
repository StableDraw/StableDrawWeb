import React from 'react';
import cl from "./AboutUs1.module.css";

export const TeamObject1 = ({ name, description, img}) => {
    return (
        <div className={cl.object}>
            <img
                className={cl.imge1}
                src={img}
                alt={name}
            />
            <div className={cl.texte}>
                <div className={cl.name}>
                    {name}
                </div>
                <div className={cl.description}>
                    {description}
                </div>
            </div>
        </div>
    )
};