import React, { useState } from 'react'
import cl from './MySelect.module.css'
import Tooltip from '@mui/material/Tooltip';

const MySelect = ({getValue, name, description, options, keyValue, defaultV}) => {
  const [value, setValue] = useState(defaultV)
  const call = (e) => {
    setValue(e.target.value)
  }

  return (
    <article className={cl.param} >
      <div style={{marginTop:'16px'}}>
          <span className={cl.paramText} style={{marginRight:40}}>{name}</span>
          <select className={cl.select}  value={value} onChange={e => call(e)} onBlur={()=>getValue(value,keyValue)}>
              {options.map(({name, value, description}, id) => <option key={id} value={value}>{name}</option>)}
          </select>
          <Tooltip title={description}>
            <img  className={cl.paramImg} src='Question.svg'/>
          </Tooltip>
      </div>
    </article>
  )
}

export default MySelect