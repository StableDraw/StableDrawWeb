import React, { useState } from 'react';
import cl from "./AboutUsFifthScreen.module.css";

const AboutUsFifthScreen = () => {
    return(
        <div className={`${cl.fifthScreen} ${cl.flexBox}`}>
            <h2 className={cl.module3DTitle}>3D модуль</h2>
            <div className={`${cl.sliderModule3d} ${cl.flexBox}`}>
                <img src="3dmodule1.png" alt="" />
                <img src="3dmodule2.svg" alt="" />
                <img src="3dmodule3.svg" alt="" />
                <img src="3dmodule4.svg" alt="" />
                <img src="3dmodule5.svg" alt="" />
                <img src="3dmodule6.svg" alt="" />
            </div>
            <div className={cl.arrowBlockModule}>
                <div className={cl.lArrow3dModule}><img src="leftArrow.svg" alt="" /></div>
                <div className={cl.rArrow3dModule}><img src="rightArrow.svg" alt="" /></div>
            </div>
            <div className={cl.text3Dmodule}>
                <p>Наши клиенты — это компании, специализирующиеся в области графического дизайна, анимации, а также разработчики дизайна упаковочной продукции. У нас уже представлено множество 3D моделей, а также мы создаём модели на заказ.</p>
            </div>
        </div>
    );
};

export default AboutUsFifthScreen;