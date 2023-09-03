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
            <img className="layers_mini_button_image" alt="merge.png" src="merge.png"></img>
        </button>
    );
};

export default Merge;