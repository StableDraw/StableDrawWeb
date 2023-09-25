import React, { useState } from 'react'
import cl from './MySelect.module.css'
const MySelect = ({getValue}) => {
  const [value, setValue] = useState('value1')
  const call = (e) => {
    setValue(e.target.value)
  }
  return (
    <article className={cl.param} >
      <div style={{marginTop:'16px'}}>
          <span className={cl.paramText} style={{marginRight:40}}>Второй параметр</span>
          <select className={cl.select}  value={value} onChange={e => call(e)} onBlur={()=>getValue(value,'select')}>
              <option className={cl.option} value="value1">Значение 1</option>
              <option value="value2">Значение 2</option>
              <option value="value3">Значение 3</option>
          </select>
          <img  className={cl.paramImg} src='Question.svg'/>
      </div>
    </article>
  )
}

export default MySelect