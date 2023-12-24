import React, { useState } from 'react';
import cl from "./AboutUsFourthScreen.module.css";

const AboutsUsFourthScreen = () => {
    return(
        <div className={`${cl.fourthScreen} ${cl.flexBox}`}>
            <h2 className={cl.processTitle}>Процесс разработки</h2>
            <div className={`${cl.processContent} ${cl.flexBox}`}>
                <div className={`${cl.listProcess} ${cl.flexBox}`}>
                    <div className={`${cl.itemListProcess} ${cl.flexBox}`}>
                        <span className={cl.numberProcess}><img src="checkProcessBlue.svg" /></span>
                        <span className={cl.textItem}>Выстраиваем микросервисную архитектуру с горизонтальным масштабированием, чтобы предоставить доступ к сервису большему количеству пользователей</span>
                    </div>
                    <div className={`${cl.itemListProcess} ${cl.flexBox}`}>
                        <span className={cl.numberProcess}><img src="checkProcessBlue.svg" /></span>
                        <span className={cl.textItem}>Выстраиваем пайплайны ci/cd , а также систему, используя шину сообщений</span>
                    </div>
                    <div className={`${cl.itemListProcess} ${cl.flexBox}`}>
                        <span className={cl.numberProcess}><img src="checkProcessBlue.svg" /></span>
                        <span className={cl.textItem}>Применяем React и фреймворки на Typescript во фронтенд-разработке.</span>
                    </div>
                    <div className={`${cl.itemListProcess} ${cl.flexBox}`}>
                        <span className={cl.numberProcess}><img src="checkProcessBlue.svg" /></span>
                        <span className={cl.textItem}>Используем Scrum-методологию, составляем спринты и создаём продукт, учитывая предпочтения каждого пользователя.</span>
                    </div>
                    <div className={`${cl.itemListProcess} ${cl.flexBox}`}>
                        <span className={cl.numberProcess}><img src="checkProcessWhite.svg" /></span>
                        <span className={cl.textItem}>Используем и выстраиваем как готовые нейросетевые решения для генерации и обработки изображений с открытым исходным кодом и лицензией, позволяющей коммерческое применение, так и разрабатываем собственные и модифицируем существующие архитектуры.</span>
                    </div>
                    <div className={`${cl.itemListProcess} ${cl.flexBox}`}>
                        <span className={cl.numberProcess}><img src="checkProcessWhite.svg" /></span>
                        <span className={cl.textItem}>Обучаем модели нейронных сетей для интеграции в сервис обработки продукта.</span>
                    </div>
                </div>
                <div className={`${cl.processImg} ${cl.flexBox}`}>
                    <img src="svidetelstvo-o-gosudarstvennoy-registracii-programmi-dlya-evm.jpg" alt="Преимущества работы со StableDraw" />
                    <span className={cl.textUnderCertificate}>Мы занимаемся расширением функционала нашего веб-сервиса по требованиям заказчиков</span>
                </div>
            </div>
        </div>
    );
};

export default AboutsUsFourthScreen;