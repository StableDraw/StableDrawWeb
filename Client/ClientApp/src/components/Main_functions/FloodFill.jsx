import React from 'react';

const FloodFill = () => {
    let dex_clr = parseInt("FF" + fillColor.slice(6, 8) + fillColor.slice(4, 6) + fillColor.slice(2, 4), 16);
    let imageData = local_ctx.getImageData(0, 0, local_ctx.canvas.width, local_ctx.canvas.height);
    /*let imageData_test_data: Uint8ClampedArray = imageData.data
    for (let i: number = 3; i < imageData_test_data.length; i += 4)
    {
        if (imageData_test_data[i] != 255)
        {
            imageData_test_data[i] = 0
        }
    }
    let pixelData: any = {
        width: imageData.width,
        height: imageData.height,
        data: new Uint32Array(imageData_test_data.buffer),
    }*/
    let pixelData = {
        width: imageData.width,
        height: imageData.height,
        data: new Uint32Array(imageData.data.buffer),
    };
    let targetColor = getPixel(pixelData, x, y);
    if (targetColor !== fillColor) {
        let spansToCheck = [];
        addSpan(spansToCheck, x, x, y, 0);
        let iter_max = Math.round(cH) * 2;
        let iter = 0;
        while (spansToCheck.length > 0 && iter <= iter_max) {
            iter++;
            let { left, right, y, direction } = spansToCheck.pop();
            let l = left;
            let iter_l_max = left - cH / 2;
            while (true) {
                --l;
                let color = getPixel(pixelData, l, y);
                if (color !== targetColor || l < iter_l_max) {
                    break;
                }
            }
            ++l;
            let r = right;
            let iter_r_max = right + cW / 2;
            while (true) {
                ++r;
                let color = getPixel(pixelData, r, y);
                if (color !== targetColor || r > iter_r_max) {
                    break;
                }
            }
            let lineOffset = y * pixelData.width;
            pixelData.data.fill(dex_clr, lineOffset + l, lineOffset + r);
            if (direction <= 0) {
                checkSpan(pixelData, targetColor, spansToCheck, l, r, y - 1, -1);
            }
            else {
                checkSpan(pixelData, targetColor, spansToCheck, l, left, y - 1, -1);
                checkSpan(pixelData, targetColor, spansToCheck, right, r, y - 1, -1);
            }
            if (direction >= 0) {
                checkSpan(pixelData, targetColor, spansToCheck, l, r, y + 1, +1);
            }
            else {
                checkSpan(pixelData, targetColor, spansToCheck, l, left, y + 1, +1);
                checkSpan(pixelData, targetColor, spansToCheck, right, r, y + 1, +1);
            }
        }
        local_ctx.putImageData(imageData, 0, 0);
    }
    return (
        <div>

        </div>
    );
};

export default FloodFill;