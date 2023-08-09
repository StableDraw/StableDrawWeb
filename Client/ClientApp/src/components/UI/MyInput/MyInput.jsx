import { useState } from "react"
import cl from './MyInput.module.css'

const MyInput = ({imgPath, imgClass}) => {
    const [value, setValue] = useState(1)
    return (
        <div>
            <img className={imgClass} alt={imgPath} src={imgPath}></img>
            <input className={cl.up_add_window_slider} type="range" min='1' max='100' value={value} onChange={(e)=>setValue(e.target.value)}/>
            <input className={cl.up_add_window_field} type="number" min="1" max="100" value={value} onChange={(e) => setValue(e.target.value)}/>
        </div>
    )
}
export default MyInput