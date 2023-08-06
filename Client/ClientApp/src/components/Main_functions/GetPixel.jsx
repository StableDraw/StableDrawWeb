import React from 'react';

const GetPixel = () => {
    if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
        return -1;
    }
    else {
        return pixelData.data[y * pixelData.width + x];
    }
    return (
        <div>

        </div>
    );
};

export default GetPixel;