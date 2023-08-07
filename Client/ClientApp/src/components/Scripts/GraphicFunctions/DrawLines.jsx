import React from 'react';

const DrawLines = () => {
    local_ctx.beginPath();
    for (let i = 0; i < arr.length - 1; i++) {
        local_ctx.lineWidth = arr[i][2];
        local_ctx.moveTo(arr[i][0], arr[i][1]);
        local_ctx.lineTo(arr[i + 1][0], arr[i + 1][1]);
        local_ctx.stroke();
    }
    return (
        <div>

        </div>
    );
};

export default DrawLines;