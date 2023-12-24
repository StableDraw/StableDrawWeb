import React, { useState } from 'react';
import cl from "./AboutUsThirdScreen.module.css";

const AboutUsThirdScreen = () => {
    return(
        <div className={`${cl.thirdScreen} ${cl.flexBox}`}>
            <h2 className={cl.advantagesTitle}>Преимущества StableDraw</h2>
            <div className={`${cl.advantagesContent} ${cl.flexBox}`}>
                <div className={`${cl.listAdvantages} ${cl.flexBox}`}>
                    <div className={`${cl.itemListAdvantages} ${cl.flexBox}`}>
                        <span className={`${cl.numberItem} ${cl.flexBox}`}>1</span><span className={cl.textItem}>Ускоряет процесс создания дизайна.</span>
                    </div>
                    <div className={`${cl.itemListAdvantages} ${cl.flexBox}`}>
                        <span className={`${cl.numberItem} ${cl.flexBox}`}>2</span><span className={cl.textItem}>Визуализирует на 3D моделях.</span>
                    </div>
                    <div className={`${cl.itemListAdvantages} ${cl.flexBox}`}>
                        <span className={`${cl.numberItem} ${cl.flexBox}`}>3</span><span className={cl.textItem}>Обрабатывает запросы на наших серверах.</span>
                    </div>
                </div>
                <div className={cl.advantagesImg}>
                    <img src="advantagesAboutUs.svg" alt="Преимущества работы со StableDraw" />
                </div>
            </div>
        </div>
    );
};

export default AboutUsThirdScreen;