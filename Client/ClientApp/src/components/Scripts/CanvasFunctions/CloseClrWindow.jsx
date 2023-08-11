import React from 'react';

const CloseClrWindow = () => {
    clr_w.removeEventListener("pointermove", handleclr_PointerMove);
    ctype_clr_btn.removeEventListener("click", handlet_clr_Click);
    is_clr_window = false;
    let ccv = cur_color.value;
    if (ccv == "#NaNNaNNaN") {
        ccv = "#" + colourBtn.style.background.split("(")[1].split(")")[0].split(",").map(function (x) {
            x = parseInt(x).toString(16);
            return (x.length == 1) ? "0" + x : x;
        }).join("");
        cur_color.value = ccv;
    }
    if (!is_clr_brash) {
        new_background_clr = ccv;
        is_clr_brash = true;
    }
    else {
        cur_brush_clr = ccv;
    }
    if (cur_background_clr != new_background_clr) //почему-то не работает, из-за этого пришлось сделать костыль строчкой сверху. Убрать
    {
        push_action_to_stack(['i', ctx_background, new_background_clr]); //залить фон
        ctx_background.fillStyle = new_background_clr; //заливка фона
        ctx_background.fillRect(0, 0, cW, cH);
        canvas_to_layer(canvas_background, ctx_layer_2);
    }
    ctx_foreground.strokeStyle = cur_brush_clr;
    ctx_add.strokeStyle = cur_brush_clr;
    ctx_background.strokeStyle = cur_brush_clr;
    clr_w.style.display = "none";
    return (
        <div>

        </div>
    );
};

export default CloseClrWindow;