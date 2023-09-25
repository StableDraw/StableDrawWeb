import React, { useState } from 'react'
import InputRange from '../InputRange/InputRange'
import InputText from '../InputText/InputText'
import MySelect from '../MySelect/MySelect'
import MyCheckBox from '../MyCheckBox/MyCheckBox'
import cl from './Parametrs.module.css'
import api from '../../../../../api/apiNeurals'
const Parametrs = ({closeWindow, closeParam, neuralType}) => {
      const closeModal = () => {
        closeWindow(false)
        closeParam(false)
    }
    const paramsToRender = []

    const renderSwitch2 = (name, value) => {
        const type = value.type
        console.log(value)
        paramsToRender.push(value)
        console.log(paramsToRender)

        switch(type) {
            case 'select':
                console.log('тут будет селект')
                break
            case 'int': 
                console.log('тут будет инпут')
                break
            case 'range': 
                console.log('тут будет range')
                break
            case 'check': 
                console.log('тут будет check')
                break
        }
    }
    const json = '{"image_count_input": 1,"description": "","params": {"ckpt": {"default": "ColorizeArtistic_gen","values": "ColorizeArtistic_gen;ColorizeArtistic_gen_GrayScale;ColorizeArtistic_gen_Sketch;ColorizeArtistic_gen_Sketch2Gray","description": "","type": "select"},"steps":{"default": 1,"description": "","type": "int"}}}'
    const newObj = JSON.parse(json)
    const parametrs = newObj.params
    
    for(const [key,value] of Object.entries(parametrs)) {
        renderSwitch2(key,value)
    }
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
                {paramsToRender.map(params => {
                    console.log(params.type)
                })}
            </div>
        </div>
        <button onClick={()=>closeModal()} className={cl.cancel}>Отмена</button>
        <button className={cl.generate} onClick={()=>console.log(renderValue)}>Сгенерировать</button>
    </div>
  )
}

export default Parametrs