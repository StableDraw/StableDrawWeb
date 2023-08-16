import { useState, useMemo, useEffect } from "react"
import cl from './PaleteInput.module.css'
let resMemo = "#000000"
const PaleteInput = ({callback, id, type}) => {
    const [value, setValue] = useState("#000000")
    const setRes = (res) => {
        if(resMemo !== res){
            resMemo = res
            const arrRes = {id,type,res}
            callback(arrRes)
        }
    }
    return (
        <div>
            <input className={cl.write_window_field} type="text" value={value} onChange={(e) => setValue(e.target.value)} onMouseLeave={()=> setRes(value)} />
        </div>
    )
}
export default PaleteInput