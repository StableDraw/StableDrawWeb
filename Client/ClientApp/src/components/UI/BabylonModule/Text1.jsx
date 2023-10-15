import React, { useState } from "react";
import cl from "./BabylonBtn.module.scss";

const Text = () => {
  return (
    <div className={cl.contentText}>
      <header>
        <div className={cl.header}>
          <div className={cl.headerText}> Babylon </div>
        </div>
        <p>
          Babylon.js — кроссбраузерный JavaScript-фреймворк, использующий API
          WebGL для отображения 2D и 3D-графики в браузере без использования
          каких-либо сторонних плагинов и дополнений. Babylon.js использует
          элемент HTML5 Canvas. Фреймворк распространяется под лицензией Apache
          2. Исходный код расположен на GitHub.
        </p>
        <p>Вы хотите открыть окно Babylon. Начать?</p>
      </header>
    </div>
  );
};

export default Text;
