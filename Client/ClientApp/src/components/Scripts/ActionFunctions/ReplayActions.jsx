import React from 'react';

const ReplayActions = () => {
    full_clear_drawfield();
    let k_X = fW_pred / f_dW;
    let k_Y = fH_pred / f_dH;
    let cur_thickness = 1;
    ctx_foreground.lineWidth = cur_thickness;
    ctx_background.lineWidth = cur_thickness;
    ctx_background.strokeStyle = "#000000";
    ctx_foreground.lineCap = "round";
    ctx_foreground.lineJoin = "round";
    ctx_add.lineCap = "round";
    ctx_add.lineJoin = "round";
    ctx_background.lineCap = "round";
    ctx_background.lineJoin = "round";
    let elem;
    for (let act of cur_pstack) {
        elem = replay_action(act, k_X, k_Y, fW_pred, fH_pred);
        k_X = elem[0];
        k_Y = elem[1];
        fW_pred = elem[2];
        fH_pred = elem[3];
    }
    ctx_add.strokeStyle = cur_brush_clr;
    ctx_foreground.strokeStyle = cur_brush_clr;
    ctx_background.strokeStyle = cur_brush_clr;
    ctx_background.fillStyle = cur_brush_clr;
    ctx_add.lineWidth = l_width;
    ctx_foreground.lineWidth = l_width;
    ctx_background.lineWidth = l_width;
    return (
        <div>

        </div>
    );
};

export default ReplayActions;