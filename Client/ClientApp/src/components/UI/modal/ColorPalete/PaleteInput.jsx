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
            <input className={cl.colorPalete} type="color" value={value} onChange={(e) => setValue(e.target.value)} onMouseLeave={()=> setRes(value)} style={{maxWidth: 200, maxHeight: 50, minWidth: 200, minHeight: 50}}/>
        </div>
    )
}
export default PaleteInput