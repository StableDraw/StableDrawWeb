import React, { useState } from 'react'
import cl from './MySelect.module.css'
import Tooltip from '@mui/material/Tooltip';

const MySelect = ({getValue, name, description, options, keyValue}) => {
  const [value, setValue] = useState('value1')
  const call = (e) => {
    setValue(e.target.value)
  }
  const array = options.split(';')

  return (
    <article className={cl.param} >
      <div style={{marginTop:'16px'}}>
          <span className={cl.paramText} style={{marginRight:40}}>{name}</span>
          <select className={cl.select}  value={value} onChange={e => call(e)} onBlur={()=>getValue(value,keyValue)}>
              {array.map((item, id) => <option key={id} value={item}>{item}</option>)}
          </select>
          <Tooltip title={description}>
            <img  className={cl.paramImg} src='Question.svg'/>
          </Tooltip>
      </div>
    </article>
  )
}

export default MySelect