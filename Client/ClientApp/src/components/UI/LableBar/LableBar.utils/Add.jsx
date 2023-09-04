import React, {useState} from 'react';
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
            style: {
                border: "4px solid rgb(154, 154, 154)",
                zIndex: i,
                position: "absolute",
                touchAction: "none",
                userSelect: "none",
                backgroundColor: "transparent"
            }
        }
        props.create(newLayer)
        NewLabel({})
        setI(i+1)
        props.canva(newCanva)
        NewCanva({})
        // toolState.setTool(new Brush(CanvasState.getCanvasList()[i]))
    }
    // console.log(i)
    return (
        <button
            onClick={AddNewlabels}
            className="layers_mini_button"
            id="add_layers"
            title="Добавить слой"
        >
            <img
                className="layers_mini_button_image"
                alt="swap.png"
                src="plus.png"
            >
            </img>
        </button>
    );
};

export default Add;