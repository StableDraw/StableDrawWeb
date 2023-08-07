import React from 'react';

const ChangeThickness = () => {
    let t_v;
    if (flag) {
        t_v = parseInt(thickness_field.value);
    }
    else {
        t_v = parseInt(e_thickness_field.value);
    }
    t_v -= 1;
    let real_t_v = Math.min(100, Math.max(0, t_v));
    if (t_v != real_t_v) {
        t_v = real_t_v;
    }
    thickness_field.value = (t_v + 1).toString();
    e_thickness_field.value = (t_v + 1).toString();
    thickness_slider.value = (t_v + 1).toString();
    e_thickness_slider.value = (t_v + 1).toString();
    let thickness_k = t_v * t_v * 0.0001; //коэффициент, чтобы толщина не увеличивалась так резко, сейчас это квадрат
    l_width = 1 + Math.max(cW, cH) * thickness_k;
    W_f = (W - cW) / 2 - l_width / 2 + 12;
    H_f = (H - cH) / 2 - l_width / 2 + 12;
    ctx_foreground.lineWidth = l_width;
    ctx_add.lineWidth = l_width;
    ctx_background.lineWidth = l_width;
    update_slider();
    (
        <div>

        </div>
    );
};

export default ChangeThickness;