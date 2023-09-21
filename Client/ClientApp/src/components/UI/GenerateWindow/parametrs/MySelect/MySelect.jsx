import React, { useState } from 'react'
import cl from './MySelect.module.css'
const MySelect = ({getValue, name, description, options}) => {
  const [value, setValue] = useState('value1')
  const call = (e) => {
    setValue(e.target.value)
  }
  const array = options.split(';')
  return (
    <article className={cl.param} >
      <div style={{marginTop:'16px'}}>
          <span className={cl.paramText} style={{marginRight:40}}>{name}</span>
          <select className={cl.select}  value={value} onChange={e => call(e)} onBlur={()=>getValue(value,'select')}>
              {array.map(item => <option value={item}>{item}</option>)}
          </select>
          <img  className={cl.paramImg} src='Question.svg'/>
      </div>
    </article>
  )
}

export default MySelect