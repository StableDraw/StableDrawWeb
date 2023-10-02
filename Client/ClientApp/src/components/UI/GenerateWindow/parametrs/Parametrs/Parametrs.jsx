import React, { useEffect, useState } from 'react'
import InputRange from '../InputRange/InputRange'
import InputText from '../InputText/InputText'
import MySelect from '../MySelect/MySelect'
import MyCheckBox from '../MyCheckBox/MyCheckBox'
import cl from './Parametrs.module.css'
import api from '../../../../../api/apiNeurals'


const renderSwitch = (value, id, func) => {
    const key = Object.keys(value)
    const type = value[key].type
    switch(type) {
        case 'select':
            return <MySelect key={id} keyValue={key} name={value[key].name}  options={value[key].values} description={value[key].description} getValue={func}/>
        case 'text':
            return <InputText key={id} keyValue={key} name={value[key].name} description={value[key].description} getValue={func}/>
        case 'range': 
            return <InputRange key={id} keyValue={key} name={value[key].name} range={value[key].range} description={value[key].description} getValue={func}/>
        case 'boolean': 
            return <MyCheckBox key={id} keyValue={key} name={value[key].name} description={value[key].description} getValue={func}/>
    }
}


const Parametrs = ({closeWindow, closeParam, json, neuralName}) => {
    
    const [file, setFile] = useState()
    const doDefaultValues = () => {
        console.log(`this is JSON: ${json}`)
        let defaultValue = {}
        if(json) {
            for(let item of json.params) {
                const param = JSON.parse(item)
                const key = Object.keys(param)
                defaultValue = ({...defaultValue, [key]:param[key].default})
            }
        }
        return defaultValue
    }
    const [renderValue, setRenderValue] = useState()
    const closeModal = () => {
        closeWindow(false)
        closeParam(false)
    }
   
    const paramsToRender = []
    if(json) {
        for (let item of json.params) {
            const param = JSON.parse(item)
            paramsToRender.push(param)
        }
    }


    const sendValuesForRender = (value, str) => {
        setRenderValue({...renderValue,[str]:value})
    }   
    // Display the key/value pairs
    
    const goOnServer = async () => {
        try {
            const formData = new FormData()
            console.log(renderValue)
            formData.append('NeuralType', neuralName)
            formData.append('Parametrs', renderValue)
            formData.append('Caption', file)
            formData.append('Promts', null)
            formData.append("Content-Type", "multipart/form-data")
            console.log('тут')
            const res = await api.RunNeural({})
            setRenderValue()
        } catch(e) {
            console.error(e)
            throw(e)
        }
    }
  return (
    <div>
            <div className={cl.image}>
                <img src='kitty.png'/>
                <input type='file' onChange={e=>setFile(e.target.files[0])}/>
            </div>
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
                {paramsToRender.map((param, id) => renderSwitch(param,id,sendValuesForRender))}
            </div>
        </div>
        <button onClick={()=>closeModal()} className={cl.cancel}>Отмена</button>
        <button className={cl.generate} onClick={()=>goOnServer()}>Сгенерировать</button>
    </div>
  )
}

export default Parametrs