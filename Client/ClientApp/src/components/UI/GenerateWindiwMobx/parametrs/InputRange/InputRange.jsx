import React, { useState } from 'react'
import cl from './InputRange.module.css'
import Tooltip from '@mui/material/Tooltip';

const InputRange = ({getValue, description,defaultV, range, name, keyValue}) => {
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
              min={range[0]} 
              max={range[1]}
              value={value} 
              onChange={(e)=>call(+e.target.value)}
              onMouseUp={()=>getValue(value, keyValue)}
            />
            <input
              className={cl.number} 
              type="number" 
              min={range[0]} 
              max={range[1]}
              value={value} 
              onChange={(e)=>call(e.target.value)} 
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