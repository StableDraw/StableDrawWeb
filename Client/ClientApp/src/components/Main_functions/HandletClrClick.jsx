import React from 'react';

const HandletClrClick = () => {
    if (is_clr_brash) {
        cur_brush_clr = cur_color.value;
        ctype_clr_btn.textContent = "Цвет кисти";
        ctype_clr_btn1.textContent = "Цвет кисти";
        cur_color.value = cur_background_clr;
        if (hexDec(cur_brush_clr) > 382) {
            ctype_clr_btn.style.color = "#000000";
            ctype_clr_btn1.style.color = "#000000";
            clrimg.style.filter = "invert(0)";
        }
        else {
            ctype_clr_btn.style.color = "#ffffff";
            ctype_clr_btn1.style.color = "#ffffff";
            clrimg.style.filter = "invert(1)";
        }
        ctype_clr_btn.style.background = cur_brush_clr;
        ctype_clr_btn1.style.background = cur_brush_clr;
        is_clr_brash = false;
    }
    else {
        ctype_clr_btn.textContent = "Цвет фона";
        ctype_clr_btn1.textContent = "Цвет фона";
        let ccv = cur_brush_clr;
        new_background_clr = cur_color.value;
        cur_color.value = ccv;
        if (hexDec(new_background_clr) > 382) {
            ctype_clr_btn.style.color = "#000000";
            ctype_clr_btn1.style.color = "#000000";
            clrimg.style.filter = "invert(0)";
        }
        else {
            ctype_clr_btn.style.color = "#ffffff";
            ctype_clr_btn1.style.color = "#ffffff";
            clrimg.style.filter = "invert(1)";
        }
        ctype_clr_btn.style.background = new_background_clr;
        ctype_clr_btn1.style.background = new_background_clr;
        if (hexDec(ccv) > 382) {
            if (!old_btn_clr[1]) {
                old_btn_clr[1] = true;
                clrimg.style.filter = "invert(0)";
            }
        }
        else {
            if (old_btn_clr[1]) {
                old_btn_clr[1] = false;
                clrimg.style.filter = "invert(1)";
            }
        }
        ok_clr_btn.style.background = ccv;
        ok_clr_btn1.style.background = ccv;
        colourBtn.style.background = ccv;
        is_clr_brash = true;
    }
    return (
        <div>

        </div>
    );
};

export default HandletClrClick;