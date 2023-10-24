import React, { useState } from 'react'
import cl from './InputText.module.css'
import Tooltip from '@mui/material/Tooltip';

const InputText = ({getValue, name, description,defaultV, keyValue}) => {
    const [value, setValue] = useState(defaultV)
    const call = (e) => {
        setValue(e.target.value)
    }
    
  return (
    <article className={cl.param}>
        <div style={{marginTop:'16px'}}>
            <span className={cl.text}>{name}</span>
            <input
                    type='text'
                    placeholder='Ввод текста...'
                    className={cl.input}
                    value={value}
                    onChange={e => call(e)}
                    // onMouseOut={()=>getValue(value,'text')}
                    onBlur={()=>getValue(value, keyValue)}
                />
            <Tooltip title={description}>
                <img  className={cl.paramImg} src='Question.svg'/>
            </Tooltip>        
        </div>
    </article>
  )
}

export default InputText