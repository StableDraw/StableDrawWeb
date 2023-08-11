import React from 'react';

const HandleclrPointerMove = () => {
    on_clr_window = true;
    let ccv = cur_color.value;
    let local_clf_layer_type;
    if (ccv == "#NaNNaNNaN") {
        ccv = "#" + colourBtn.style.background.split("(")[1].split(")")[0].split(",").map(function (x) {
            x = parseInt(x).toString(16);
            return (x.length == 1) ? "0" + x : x;
        }).join("");
        cur_color.value = ccv;
    }
    if (is_clr_brash) {
        local_clf_layer_type = 0;
    }
    else {
        local_clf_layer_type = 1;
    }
    if (hexDec(ccv) > 382) {
        if (!old_btn_clr[local_clf_layer_type]) {
            old_btn_clr[local_clf_layer_type] = true;
            ok_clr_btn.style.color = "#000000";
            clrimg.style.filter = "invert(0)";
        }
    }
    else {
        if (old_btn_clr[local_clf_layer_type]) {
            old_btn_clr[local_clf_layer_type] = false;
            ok_clr_btn.style.color = "#ffffff";
            clrimg.style.filter = "invert(1)";
        }
    }
    ok_clr_btn.style.background = ccv;
    colourBtn.style.background = ccv;
    return (
        <div>

        </div>
    );
};

export default HandleclrPointerMove;