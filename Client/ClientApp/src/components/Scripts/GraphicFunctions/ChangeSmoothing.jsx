import React from 'react';

const ChangeSmoothing = () => {
    cur_smoothing = parseInt(smoothing_field.value);
    let real_s_v = Math.min(100, Math.max(0, cur_smoothing));
    if (cur_smoothing != real_s_v) {
        cur_smoothing = real_s_v;
        smoothing_field.value = cur_smoothing.toString();
    }
    k_smooth = 0;
    let step = 1.0 / cur_smoothing;
    for (let t = 0; t < 1 + step; t += step) //очень странный костыль, исправлю позже
    {
        t = Math.min(1, t);
        k_smooth++;
    }
    update_slider();
    return (
        <div>

        </div>
    );
};

export default ChangeSmoothing;