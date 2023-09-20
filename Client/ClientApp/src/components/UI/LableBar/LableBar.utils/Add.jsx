import React, {useMemo, useState} from 'react';
import toolState from "../../../../store/toolState";
import canvasState from "../../../../store/canvasState";
import CanvasState from "../../../../store/canvasState";
import Brush from "../../../../tools/Brush";

const Add = (props) => {
    const [label, NewLabel] = useState({})
    const [canva, NewCanva] = useState({})
    let [i, setI] = useState(1)
    const AddNewlabels = (e) => {
        e.preventDefault()
        const newLayer = {
            ...label,
            id: Date.now(),
            index: i
        }
        const newCanva = {
            ...canva,
            id: Date.now(),
            index: i,
            style: { zIndex: i, position: "absolute", touchAction: "none",userSelect: "none", backgroundColor: "transparent"}
        }

        props.create(newLayer)
        NewLabel({})
        setI(i+1)
        props.canva(newCanva)
        NewCanva({})
    }
    // console.log(CanvasState.getCanvasList())
    return (
        <button onClick={AddNewlabels} className="layers_mini_button" id="add_layers" title="Добавить слой">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M17.5 12.1741V22.7982" stroke="#656565" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22.8172 17.4856H12.1829" stroke="#656565" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.3571 5H11.6429C7.55952 5 5 8.00571 5 12.2607V23.7393C5 27.9943 7.54762 31 11.6429 31H23.3571C27.4524 31 30 27.9943 30 23.7393V12.2607C30 8.00571 27.4524 5 23.3571 5Z" stroke="#656565" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    );
};

export default Add;