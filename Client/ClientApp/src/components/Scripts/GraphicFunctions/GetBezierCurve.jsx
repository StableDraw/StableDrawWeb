import React from 'react';

const GetBezierCurve = () => {
    step = 1.0 / step;
    let res = new Array();
    for (let t = 0; t < 1 + step; t += step) {
        t = Math.min(1, t);
        let ind = res.length;
        res[ind] = [0, 0, 0];
        for (let i = 0; i < arr.length; i++) {
            let b = getBezierBasis(i, arr.length - 1, t);
            res[ind][0] += arr[i][0] * b;
            res[ind][1] += arr[i][1] * b;
            res[ind][2] += arr[i][2] * b;
        }
    }
    console.log(res);
    return res;
    return (
        <div>

        </div>
    );
};

export default GetBezierCurve;