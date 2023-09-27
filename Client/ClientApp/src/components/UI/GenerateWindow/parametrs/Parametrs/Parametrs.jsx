import React, { useState } from 'react'
import InputRange from '../InputRange/InputRange'
import InputText from '../InputText/InputText'
import MySelect from '../MySelect/MySelect'
import MyCheckBox from '../MyCheckBox/MyCheckBox'
import cl from './Parametrs.module.css'
const Parametrs = ({closeWindow, closeParam,json,neuralName}) => {
    const closeModal = () => {
        closeWindow(false)
        closeParam(false)
    }
    const renderSwitch2 = (value, id) => {
        const key = Object.keys(value)
        const type = value[key].type
        switch(type) {
            case 'select':
                return <MySelect key={id} keyValue={key} name={value[key].name}  options={value[key].values} description={value[key].description} getValue={sendValuesForRender}/>
            case 'text':
                return <InputText key={id} keyValue={key} name={value[key].name} description={value[key].description} getValue={sendValuesForRender}/>
            case 'range': 
                return <InputRange key={id} keyValue={key} name={value[key].name} range={value[key].range} description={value[key].description} getValue={sendValuesForRender}/>
            case 'boolean': 
               return <MyCheckBox key={id} keyValue={key} name={value[key].name} description={value[key].description} getValue={sendValuesForRender}/>
        }
    }
    const paramsToRender = []
    let defaultValue= {}
    if(json) {
        for (let item of json.params) {
            const param = JSON.parse(item)
            paramsToRender.push(param)
            const key = Object.keys(param)
            defaultValue = ({...defaultValue, [key]:param[key].default})
        }
    }

    const [renderValue, setRenderValue] = useState()
    // console.log(defaultValue)
    const sendValuesForRender = (value, str) => {
        setRenderValue({...renderValue,[str]:value})
    }
    const response = {[neuralName]:{renderValue}}
    const goOnServer = () => {
        console.log(JSON.stringify(response))
        setRenderValue({})
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
                {paramsToRender.map((param, id) => renderSwitch2(param,id))}
            </div>
        </div>
        <button onClick={()=>closeModal()} className={cl.cancel}>Отмена</button>
        <button className={cl.generate} onClick={()=>goOnServer()}>Сгенерировать</button>
    </div>
  )
}

export default Parametrs