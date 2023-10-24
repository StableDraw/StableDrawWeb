import React, {useState} from 'react';
import Merge from "./Merge";
import Add from "./Add";
import cl from "./LableBar.module.css";
import ListLayers from "../layer/ListLayers/ListLayers.jsx";
import {observer} from 'mobx-react-lite'
import canvasState from '../../../store/canvasState.tsx';
// import CanvasState from "../../../store/canvasState";

const LableBar = observer((props) => {
    // const [layers, SetLayer] = useState([
    //     {id: Date.now(), index: 0}
    // ])
    // const AddNewlabels = (newLayer) => {
    //     SetLayer([...layers, newLayer])
    // }
    // const Removelabels = (layer) => {
    //     SetLayer(layers.filter(l => l.id !== layer.id))
    // }
    
    // new logic
    const [range, setRange] = useState(0)
    // const Grad = (e) => {
    //     e.preventDefault()
    //     CanvasState.canvas.style.opacity = (1 - (e.target.value / 100))
    //     setRange(e.target.value)
        
    // }
    // const DefaultOpacity = (value) => {
    //     if (value === (0 || "")) {
    //         setRange(0)
    //     } else {
    //         setRange(100 - value * 100)
    //     }
    //     // console.log(CanvasState.getCanvasList())
    // }
    
    return (
        <div className={cl.layers}>
            <label className={cl.opacity__block} style={{background: `linear-gradient(to right, #93BBE3 ${range}%, #ABABAB 0%)`}}>
                <span className={cl.opacity__text}>Прозрачность: {range}%</span> 
                <input 
                    type="range" 
                    style={{opacity: 0}} 
                    // onChange={(e) => Grad(e)}
                    
                />
            </label>
            <ListLayers/>
            <div>
                <div className={cl.scale__block}>
                    <input className={cl.input__scale} onChange={(e) => canvasState.setHeight(e.target.value)} 
                           defaultValue={canvasState.height} placeholder="Высота" type="number"/>
                    
                    <input className={cl.input__scale} onChange={(e) => canvasState.setWidth(e.target.value)} 
                           defaultValue={canvasState.width} placeholder="Ширина" type="number"/>
                </div>
                <div className={cl.layers__button}>
                    <div className={cl.left__button_group}>
                        {/*<Swap/>*/}
                        <Add/>
                        <Merge/>
                    </div>
                </div>
            </div>
            
        </div>
    );
})

export default LableBar;