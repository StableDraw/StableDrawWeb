import React from 'react';

const CheckSpan = () => {
    let inSpan = false;
    let start = 0;
    let x;
    for (x = left; x < right; ++x) {
        let color = getPixel(pixelData, x, y);
        if (color === targetColor) {
            if (!inSpan) {
                inSpan = true;
                start = x;
            }
        }
        else {
            if (inSpan) {
                inSpan = false;
                addSpan(spansToCheck, start, x - 1, y, direction);
            }
        }
    }
    if (inSpan) {
        inSpan = false;
        addSpan(spansToCheck, start, x - 1, y, direction);
    }
    return (
        <div>

        </div>
    );
};

export default CheckSpan;