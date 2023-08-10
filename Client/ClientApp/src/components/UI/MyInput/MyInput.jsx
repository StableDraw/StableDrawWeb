import { useState, useMemo, useEffect } from "react"
import cl from './MyInput.module.css'
let resMemo = 0
const MyInput = ({imgPath, imgClass, callback, id, type}) => {
    const [value, setValue] = useState(1)
    const setRes = (res) => {
        if(resMemo !== res){
            resMemo = res
            callback({id,type,res: parseInt(res)})
        }
    }
    
    return (
        <div>
            <img className={imgClass} alt={imgPath} src={imgPath}></img>
            <input className={cl.up_add_window_slider} type="range" min='1' max='100' value={value} onChange={(e)=>setValue(e.target.value)} onMouseLeave={()=>setRes(value)}/>
            <input className={cl.up_add_window_field} type="number" min="1" max="100" value={value} onChange={(e) => setValue(e.target.value)} onMouseLeave={()=> setRes(value)} />
        </div>
    )
}
export default MyInput