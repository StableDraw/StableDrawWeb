import { useState, useMemo, useEffect } from "react"
import cl from './MyInput.module.css'
import toolState from "../../../store/toolState";
const MyInput = ({imgPath, imgClass, id, type}) => {
    const [value, setValue] = useState(1)

    const CallRange = (e) => {
        toolState.setLineWidth(e.target.value)
        setValue(e.target.value)
    }
    const CallNumber = (e) => {
        toolState.setBezieCurve(e.target.value)
        setValue(e.target.value)
    }
    
    return (
        <div>
            <img className={imgClass} alt={imgPath} src={imgPath}></img>
            <input className={cl.up_add_window_slider} type="range" min='1' max='100' value={value} onChange={e => CallRange(e)} />
            <input className={cl.up_add_window_field} type="number" min="1" max="100" value={value} onChange={e => CallNumber(e)} />
        </div>
    )
}
export default MyInput