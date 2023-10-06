import React, { useState } from 'react'
import cl from './MyCheckBox.module.css'
import Tooltip from '@mui/material/Tooltip';

const MyCheckBox = ({getValue, name, defaultV, description, keyValue}) => {
  
  const [value, setValue] = useState(defaultV)
  return (
    <article className={cl.param}>
        <div style={{marginTop:'16px'}}>
            <span className={cl.text}>{name}</span>
            <label className={cl.switch}>
                <input checked={value} type="checkbox" onChange={()=> setValue(!value)} onBlur={()=>getValue(value, keyValue)}/>
                <span className={cl.slider_round}/>
            </label>
            <Tooltip title={description}>
              <img  className={cl.paramImg} src='Question.svg'/>
            </Tooltip>
        </div>
    </article>

  )
}
export default MyCheckBox