import React from 'react';
import CanvasState from "../../../../store/canvasState";
import toolState from "../../../../store/toolState";
import Brush from "../../../../tools/Brush";

const Merge = (props) => {
    
    const Merge = () => {
        CanvasState.mergeAllCanvas()
        props.mergeCanvas(CanvasState.getMergeCanvas())
        toolState.setTool(new Brush(CanvasState.getCanvas()))
    }
    return (
        <button onClick={Merge} className="layers_mini_button" id="merge_layers" title="Объединить слои">
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                <g clipPath="url(#clip0_58_286)">
                    <path d="M504.68 -395.9V227.18H-155.4V-395.9H504.68ZM507.64 -398.86H-158.36V230.14H507.64V-398.86Z" fill="#656565"/>
                    <path d="M30.2778 5H12.9444C12.5472 5 12.2222 5.325 12.2222 5.72222V12.2222H5.72222C5.325 12.2222 5 12.5472 5 12.9444V30.2778C5 30.675 5.325 31 5.72222 31H23.0556C23.4528 31 23.7778 30.675 23.7778 30.2778V23.7778H30.2778C30.675 23.7778 31 23.4528 31 23.0556V5.72222C31 5.325 30.675 5 30.2778 5ZM22.3333 29.5556H6.44444V13.6667H12.2222V23.0556C12.2222 23.4528 12.5472 23.7778 12.9444 23.7778H22.3333V29.5556ZM29.5556 22.3333H13.6667V6.44444H29.5556V22.3333Z" fill="#656565"/>
                </g>
                <defs>
                    <clipPath id="clip0_58_286">
                        <rect width="37" height="37" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </button>
    );
};

export default Merge;