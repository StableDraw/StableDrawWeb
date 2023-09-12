import React, { useState } from 'react'
import cl from './InputRange.module.css'
const InputRange = () => {
    const [value, setValue] = useState(1)
  return (
    <article className={cl.param}>
        <div style={{marginTop:'16px'}}>
            <span className={cl.text}>Третий параметр</span>
            <input className={cl.range} type="range" min='1' max='100' value={value} onChange={(e)=>setValue(e.target.value)}/>
            <input className={cl.number} type="number" min="1" max="100" value={value} onChange={(e)=>setValue(e.target.value)}/>
            <img  className={cl.paramImg} src='Question.svg'/>
        </div>
    </article>
  )
}

export default InputRange