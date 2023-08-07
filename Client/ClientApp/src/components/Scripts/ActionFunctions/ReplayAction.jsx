import React from 'react';

const ReplayAction = () => {
    let act_type = act[0];
    switch (act_type) {
        case 'p': //если это примитив
            let prim = act[2];
            act[1].strokeStyle = act[3];
            act[1].globalCompositeOperation = act[4];
            act[1].beginPath();
            for (let i = 1; i < prim.length; i++) {
                act[1].lineWidth = prim[i][2];
                act[1].moveTo(prim[i - 1][0] / k_X, prim[i - 1][1] / k_Y);
                act[1].lineTo(prim[i][0] / k_X, prim[i][1] / k_Y);
            }
            act[1].stroke();
            act[1].globalCompositeOperation = "source-over";
            break;
        case 'd': //если очистка экрана
            cur_background_clr = "#fff";
            ctx_background.fillStyle = cur_background_clr;
            ctx_background.fillRect(0, 0, cW, cH);
            ctx_foreground.clearRect(0, 0, cW, cH);
            break;
        case 'r': //если изменение размеров экрана
            k_X = (k_X * act[1]) / fW_pred;
            k_Y = (k_Y * act[2]) / fH_pred;
            fW_pred = act[1];
            fH_pred = act[2];
            break;
        case 'i': //если заливка слоя целиком
            act[1].fillStyle = act[2];
            act[1].fillRect(0, 0, cW, cH);
            break;
        case 'u': //если добавление изображения с ПК
            act[1].clearRect(0, 0, cW, cH); //очищаем нужный слой
            act[1].drawImage(act[2], 0, 0, act[3], act[4], act[5], act[6], cW - act[5] * 2, cH - act[6] * 2);
            original_image_buf = act[2];
            break;
        case 'f': //если заливка
            floodFill(act[1], act[2], act[3], act[4]);
            break;
        case 'c': //если очистка одного слоя
            act[1].clearRect(0, 0, cW, cH);
            break;
        default:
            break;
    }
    return [k_X, k_Y, fW_pred, fH_pred];
    return (
        <div>

        </div>
    );
};

export default ReplayAction;