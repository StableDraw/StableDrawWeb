import React, {useEffect, useRef} from 'react';

const CanvasItems = ({width, height, styles, index, id ,labelData, refs}) => {
    const canvasRef = useRef(null)
    
    useEffect(() => {
        refs(canvasRef)
    }, []);

    
    return (
        <canvas
            ref={canvasRef}
            id={id}
            index={index}
            width={`${width}px`}
            height={`${height}px`}
            style={styles}>
        </canvas>
    );
};

export default CanvasItems;