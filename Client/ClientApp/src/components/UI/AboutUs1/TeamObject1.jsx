import React from 'react';
import cl from "./AboutUs1.module.css";

export const TeamObject1 = ({ name, description, img}) => {
    return (
        <div className={cl.itemListOurTeam}>
            <img
                className={cl.itemListOurTeamImg}
                src={img}
                alt={name}
            />
            <div className={cl.itemListOurTeamText}>
                <div className={cl.itemListOurTeamName}>
                    {name}
                </div>
                <div className={cl.itemListOurTeamNameDescription}>
                    {description}
                </div>
            </div>
        </div>
    )
};