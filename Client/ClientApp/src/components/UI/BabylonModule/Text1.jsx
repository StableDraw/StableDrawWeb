import React, {useState} from 'react';
import cl from "./BabylonBtn.module.css";
const Text = () => {

    return (
        <div className={cl.contentText}>
            <header>
                <div className={cl.header}>
                    <div className={cl.headerText}> Babylon </div>
                </div>
                <div className={cl.Bab}>Babylon.js — кроссбраузерный JavaScript-фреймворк, использующий API WebGL для отображения 2D и 3D-графики в браузере без использования каких-либо сторонних плагинов и дополнений.
                    Babylon.js использует элемент HTML5 Canvas. Фреймворк распространяется под лицензией Apache 2. Исходный код расположен на GitHub.
                    </div>
                <div className={cl.Bab1}>Вы хотите открыть окно Babylon. Начать?</div>
            </header>
        </div>
    );
};

export default Text;