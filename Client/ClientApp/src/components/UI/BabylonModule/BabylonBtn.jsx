import React from 'react';
import cl from "./BabylonBtn.module.css";
import { Link } from "react-router-dom";
import api from '../../../api/api';


const sendImgToBack = async (ImgBase64, fileName) => {
    //конвертируем base64 в file, затем в formData
    await fetch(ImgBase64)
        .then(res => res.blob())
        .then(async (blob) => {
            const file = new File([blob], fileName, { type: "image" });
            let formData = new FormData();
            formData.append(`file`, file);
            formData.append("Content-Type", "multipart/form-data");

            const data = await api.LoadTexture(formData);
            return data;
        })
}

const BabylonModule = ({img}) => {

    /**
 * @function loadImgToBabylon загружает картинку в minIo и клиентскую bd, также синхронизирует(пока не особо)
 * интерфейс 3d модуля с появлением новой картинки
 * 
 * @function sendImgToBack конвертирует формат base64 в formData для дальнейшей отправки на сервер
 * 
 * @param ImgBase64 {String} передаём в следующем формате: `data:image/jpeg;base64,${base64Array}`
 * (jpeg/png меняются в зависимости от формата файла, вроде его не обязательно соблюдать)
 * 
 * @param fileName {String} имя под которым файл будет храниться в minIo и бд 
 * (!!!обязательно передавать, либо сделать одно дефолтное имя для всех файлов)
 * 
 * При одновременной отправке текстуры и переходе в 3d редактор на текущий момент возможны баги, 
 * так как важно, чтобы картинка успела прийти на сервер до маунта страницы, в случае багов, обновите страницу 3d модуля: 
 * текстура появится в нижнем меню.
 * 
 * Проверить работоспособность функций можно в файле menu.jsx в папке babylon проекта.(но я тестил, всё работает)
 */
  
    const loadImgToBabylon = async (ImgBase64, fileName) => {
       
        const data = sendImgToBack(ImgBase64, fileName);
    }

    return (
            <Link className={cl.babylonCont} to='/3d' onClick={()=>loadImgToBabylon(img,'3D_Object')}>
                <span className={cl.txt}>Открыть 3D модуль</span>
            </Link>
    );
};

export default BabylonModule;