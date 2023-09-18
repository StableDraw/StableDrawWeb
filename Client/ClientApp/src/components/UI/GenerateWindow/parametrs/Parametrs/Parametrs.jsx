import React, { useState } from 'react'
import InputRange from '../InputRange/InputRange'
import InputText from '../InputText/InputText'
import MySelect from '../MySelect/MySelect'
import MyCheckBox from '../MyCheckBox/MyCheckBox'
import cl from './Parametrs.module.css'
const Parametrs = ({closeWindow, closeParam, neuralType}) => {
    const closeModal = () => {
        closeWindow(false)
        closeParam(false)
    }
    console.log('render')
    const [renderValue, setRenderValue] = useState({
        text: 'default',
        select: 'default',
        range: '1',  
        checkBox: false,
    })
    const call = (value, str) => {
        setRenderValue({...renderValue,[str]:value})
    }
    
    const renderSwitch = (type) => {
        switch(type) {
            case 'Апскейл': 
                return (
                    <div>
                        <InputText getValue={call}/>
                        <MySelect getValue={call}/>
                        <InputRange getValue={call}/>
                        <MyCheckBox getValue={call}/>
                    </div>
                )
            case 'Генерация по тексту':
                return (
                    <div>
                        <MySelect/>
                        <MySelect/>
                        <MySelect/>
                    </div>
                )
            case 'Генерация по описанию':
                return (
                    <div>
                        <InputRange/>
                        <InputRange/>
                        <InputRange/>
                    </div>
                )
        }
    }
  return (
    <div>
        <div className={cl.params}>
            <div style={{display:'flex'}}>
                <input
                    type='text'
                    placeholder='Найти параметры...'
                    className={cl.findParam}
                />
                <button className={cl.saveParam}>
                    <p className={cl.saveParamText}>Сохранить параметры</p> 
                </button>
            </div>
            <div className={cl.paramsList}>
                {renderSwitch(neuralType)}
              
            </div>
        </div>
        <button onClick={()=>closeModal()} className={cl.cancel}>Отмена</button>
        <button className={cl.generate} onClick={()=>console.log(renderValue)}>Сгенерировать</button>
    </div>
  )
}

export default Parametrs