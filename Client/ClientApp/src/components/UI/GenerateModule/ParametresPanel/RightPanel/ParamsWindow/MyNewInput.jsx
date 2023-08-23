import { useState, useMemo, useEffect } from "react"
import Slider from '@mui/material/Slider';
import cl from './MyNewInput.module.css'
let resMemo = 0
const MyNewInput = ({callback, id}) => {
    const [value, setValue] = useState(1)
    const setRes = (res) => {
        if(resMemo !== res){
            resMemo = res
            const arrRes = {id, res: parseInt(res)}
            callback(arrRes)
        }
    }
    return (
        <div style={{display: "flex"}}>
            <div className={cl.slider}> 
                <Slider
                    className={cl.MUIslider} 
                    type='range'
                    size="small" 
                    aria-label="Small"  
                    defaultValue={0}
                    // min='1'
                    max='100' 
                    valueLabelDisplay="auto"
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                    onMouseLeave={()=>setRes(value)}
                />
            </div>
            {/* <input className={cl.up_add_window_slider} type="range" min='1' max='100' value={value} onChange={(e)=>setValue(e.target.value)} onMouseLeave={()=>setRes(value)}/> */}
            <input className={cl.up_add_window_field} type="number" min="0" max="100" value={value} onChange={(e) => setValue(e.target.value)} onMouseLeave={()=> setRes(value)} />
        </div>
    )
}
export default MyNewInput