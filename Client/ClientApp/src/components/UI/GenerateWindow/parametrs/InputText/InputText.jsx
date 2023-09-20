import React, { useState } from 'react'
import cl from './InputText.module.css'
const InputText = () => {
    const [value, setValue] = useState('')
    const call = (e) => {
        setValue(e.target.value)
    }
  return (
    <article className={cl.param}>
        <div style={{marginTop:'16px'}}>
            <span className={cl.text}>Первый параметр</span>
            <input
                    type='text'
                    placeholder='Ввод текста...'
                    className={cl.input}
                    value={value}
                    onChange={e => call(e)}
                />
            <img  className={cl.img} src='Question.svg'/>
        </div>
    </article>
  )
}

export default InputText