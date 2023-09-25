import React, { useState } from 'react'
import cl from './MyCheckBox.module.css'
const MyCheckBox = ({getValue}) => {
  const [value, setValue] = useState(false)
  return (
    <article className={cl.param}>
        <div style={{marginTop:'16px'}}>
            <span className={cl.text}>Четвертый параметр</span>
            <label className={cl.switch}>
                <input type="checkbox" onChange={()=> setValue(!value)} onBlur={()=>getValue(value, 'checkBox')}/>
                <span className={cl.slider_round}/>
            </label>
            <img  className={cl.img} src='Question.svg'/>
        </div>
    </article>

  )
}
export default MyCheckBox