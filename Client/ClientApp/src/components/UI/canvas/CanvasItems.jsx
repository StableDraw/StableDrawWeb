import React, {useEffect, useRef} from 'react';

const CanvasItems = ({width, height, style, index, id ,labelData, refs}) => {
    const canvasRef = useRef(null)
    
    useEffect(() => {
        refs(canvasRef)
    }, []);

    
    return (
        <canvas
            ref={canvasRef}
            id={id}
            index={index}
            width={width}
            height={height}
            style={style}>
        </canvas>
    );
};

export default CanvasItems;