import React, { useState } from 'react'
import './Caption.css'
import Tooltip from '@mui/material/Tooltip';
const Caption = ({setCaption}) => {
    const [value, setValue] = useState('')
    const call = (e) => {
        setValue(e.target.value)
    }
  return (
    <article className='param'>
        <div className='cont'>
            <h3><span className='text'>Caption</span></h3>
            <input
                    type='text'
                    placeholder='Ввод текста...'
                    className='input'
                    value={value}
                    onChange={e => call(e)}
                    // onMouseOut={()=>getValue(value,'text')}
                    onBlur={()=>setCaption(value)}
                />
            <Tooltip title='Caption'>
                <img  className='paramImg' src='Question.svg'/>
            </Tooltip>        
        </div>
    </article>  )
}

export default Caption