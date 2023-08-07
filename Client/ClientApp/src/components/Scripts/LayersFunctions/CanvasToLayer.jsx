import React from 'react';

const CanvasToLayer = () => {
    let image_layer = new Image();
    image_layer.onload = function () {
        local_layer.drawImage(image_layer, 0, 0, cW, cH, 0, 0, lwW, lwH);
    };
    image_layer.src = local_canvas.toDataURL();
    return (
        <div>

        </div>
    );
};

export default CanvasToLayer;