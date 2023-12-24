import React, { useState } from 'react';
import cl from "./AboutUsSecondScreen.module.css";

const AboutUsSecondScreen = () => {
    return(
        <div className={`${cl.secondScreen} ${cl.flexBox}`}>
            <div className={cl.textSecondScreen}>
                <div className={cl.glassBlock}>
                    <p>Технологии служат искусству и помогают людям являть миру своё видение.</p>
                </div>
            </div>
            <div className={`${cl.secondScreenImages} ${cl.flexBox}`}>
                <img src="vangog.png" alt="Технологии в сочетании с искусством" />
                <img src="starnightvangog.png" alt="ИИ помогает самовырожаться через искусство" />
            </div>
        </div>
    );
};

export default AboutUsSecondScreen;