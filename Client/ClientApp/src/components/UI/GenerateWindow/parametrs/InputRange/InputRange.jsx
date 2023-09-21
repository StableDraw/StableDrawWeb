import React, { useState } from 'react'
import cl from './InputRange.module.css'
const InputRange = ({getValue,description,range,name}) => {
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
              onMouseUp={()=>getValue(value, 'range')}
            />
            <input 
              className={cl.number} 
              type="number" 
              min="1"
              max="100" 
              value={value} 
              onChange={(e)=>setValue(e.target.value)} 
              onBlur={()=>getValue(value, 'range')}
            />
            <img  className={cl.paramImg} src='Question.svg'/>
        </div>
    </article>
  )
}

export default InputRange