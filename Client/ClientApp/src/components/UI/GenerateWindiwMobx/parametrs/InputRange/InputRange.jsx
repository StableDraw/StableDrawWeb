import React, { useState } from 'react'
import cl from './InputRange.module.css'
import Tooltip from '@mui/material/Tooltip';

const InputRange = ({getValue, description,defaultV, max, min, step, name, keyValue}) => {
  const [value, setValue] = useState(defaultV)
  const call = (res) => {
    setValue(res)
  }
  return (
    <article className={cl.param}>
        <div className={cl.container}>
            <span className={cl.text}>{name}</span>
            <input
              className={cl.range}
              type="range" 
              min={min} 
              max={max}
              value={value} 
              onChange={(e)=>call(+e.target.value)}
              onMouseUp={()=>getValue(value, keyValue)}
              step={step}
            />
            <input
              className={cl.number} 
              type="number" 
              min={min} 
              max={max}
              value={value} 
              onChange={(e)=>call(+e.target.value)} 
              onBlur={()=>getValue(value, keyValue)}
              step={step}
            />
            <Tooltip title={description}>
              <img  className={cl.paramImg} src='Question.svg'/>
           </Tooltip>
        </div>
    </article>
  )
}

export default InputRange