import React from 'react';

const GetVisualRatio = () => {
    const rat = [[2.0556, 21, 9], [1.5556, 16, 9], [1.1667, 4, 3], [0.875, 1, 1], [0.6562, 3, 4], [0.4955, 9, 16]];
    let cur_ratio = w / h;
    let v_w = 0;
    let v_h = 0;
    let cur_k;
    if (cur_ratio <= 0.4955) {
        v_w = 9;
        v_h = 21;
    }
    else {
        let r;
        for (r of rat) {
            if (cur_ratio > r[0]) {
                v_w = r[1];
                v_h = r[2];
                break;
            }
        }
    }
    if (cur_ratio > v_w / v_h) {
        cur_k = h / v_h;
        v_w = Math.round(w / cur_k);
    }
    else {
        cur_k = w / v_w;
        v_h = Math.round(h / cur_k);
    }
    let res = (v_w).toString() + ":" + (v_h).toString();
    if (!abs) {
        res = "≈" + res;
    }
    return res;
    return (
        <div>

        </div>
    );
};

export default GetVisualRatio;