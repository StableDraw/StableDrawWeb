import React, { useState } from 'react';
import cl from "./AboutUsFirstScreen.module.css";

const AboutUsFirstScreen = () => {
    return(
        <div className={`${cl.firstScreen} ${cl.flexBox}`}>
            <div className={cl.firstScreenImage}>
                <img src="Neural1.png" alt="Платформа для работы с изображениями и анимацией с использованием нейронных сетей." />
            </div>
            <div className={`${cl.textFirstScreen} ${cl.flexBox}`}>
                <p>Веб-платформа для рисования, обработки изображений и создания анимаций с применением искусственных нейронных сетей.</p>
            </div>
            <h1 className={cl.h1FirstScreen}>StableDraw</h1>
        </div>
    );
};

export default AboutUsFirstScreen;