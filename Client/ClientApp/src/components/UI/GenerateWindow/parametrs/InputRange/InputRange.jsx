import React, { useState } from 'react'
import cl from './InputRange.module.css'
import Tooltip from '@mui/material/Tooltip';

const InputRange = ({getValue, description, range, name, keyValue}) => {
  const [value, setValue] = useState(1)
  const call = (res) => {
    setValue(res)
  }
  return (
    <article className={cl.param}>
        <div style={{marginTop:'16px'}}>
            <span className={cl.text}>{name}</span>
            <input
              className={cl.range}
              type="range" 
              min={range.low} 
              max={range.high}
              value={value} 
              onChange={(e)=>call(e.target.value)}
              onMouseUp={()=>getValue(value, keyValue)}
            />
            <input 
              className={cl.number} 
              type="number" 
              min="1"
              max="100" 
              value={value} 
              onChange={(e)=>setValue(e.target.value)} 
              onBlur={()=>getValue(value, keyValue)}
            />
            <Tooltip title={description}>
              <img  className={cl.paramImg} src='Question.svg'/>
           </Tooltip>
        </div>
    </article>
  )
}

export default InputRange