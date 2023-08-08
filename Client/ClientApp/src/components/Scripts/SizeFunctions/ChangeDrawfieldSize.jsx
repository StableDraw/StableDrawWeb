import React from 'react';

const ChangeDrawfieldSize = () => {
    let prev_f_dW = f_dW;
    let prev_f_dH = f_dH;
    f_dW = Math.min(fW_max, Math.max(fW_min, new_dfw));
    f_dH = Math.min(fH_max, Math.max(fH_min, new_dfh));
    d_frame.style.width = f_dW + "px";
    d_frame.style.height = f_dH + "px";
    cW = cW * (f_dW / prev_f_dW);
    cH = cH * (f_dH / prev_f_dH);
    cD = cW / cH;
    if (cD > orig_lD) {
        lW = orig_lW;
        lH = orig_lW / cD;
    }
    else {
        lH = orig_lH;
        lW = orig_lH * cD;
    }
    lWp = Math.round(995 * (lW / orig_lW)) / 10 + '%';
    lHp = Math.round(1000 * (lH / orig_lH)) / 10 + '%';
    layer_icon_1.style.width = lWp;
    layer_icon_2.style.width = lWp;
    layer_icon_1.style.height = lHp;
    layer_icon_2.style.height = lHp;
    canvas_foreground.width = cW;
    canvas_foreground.height = cH;
    canvas_background.width = cW;
    canvas_background.height = cH;
    canvas_additional.height = cH;
    canvas_additional.width = cW;
    ctx_foreground.lineWidth = l_width;
    ctx_background.lineWidth = l_width;
    W_f = (W - cW) / 2 - l_width / 2 + 12;
    W_min = (W - f_dW) / 4;
    W_max = f_dW + W_min;
    H_f = (H - cH) / 2 - l_width / 2 + 12;
    H_min = (H - f_dH) / 4;
    H_max = f_dH + H_min;
    X_move = f_dW - prev_f_dW;
    Y_move = f_dH - prev_f_dH;
    return (
        <div>

        </div>
    );
};

export default ChangeDrawfieldSize;