import React, { useState, useMemo, useEffect } from "react"
import cl from './MyInput.module.css'
import toolState from "../../../store/toolState";
const MyInput = (props) => {
    const [value, setValue] = useState(1)
    

    // new logic
    const [range, setRange] = useState(toolState.width)
    const Grad = (e) => {
        toolState.setLineWidth(e.target.value)
        setValue(e.target.value)
        e.preventDefault()
        setRange(toolState.width)

    }
    
    return (
        <label className={cl.opacity__block} style={{background: `linear-gradient(to right, #93BBE3 ${toolState.width}%, #ABABAB 0%)`}}>
            <span className={cl.opacity__text}>Толщина: {toolState.width}px</span>
            <input type="range" style={{opacity: 0}} value={range} min="1" max="100" onChange={(e) => Grad(e)}/>
        </label>
        // <div>
        //    
        //     {/*<img className={imgClass} alt={imgPath} src={imgPath}></img>*/}
        //     {/*<input className={cl.up_add_window_slider} type="range" min='1' max='100' value={value} onChange={e => CallRange(e)} />*/}
        //     {/*<input className={cl.up_add_window_field} type="number" min="1" max="100" value={value} onChange={e => CallNumber(e)} />*/}
        // </div>
    )
}
export default MyInput