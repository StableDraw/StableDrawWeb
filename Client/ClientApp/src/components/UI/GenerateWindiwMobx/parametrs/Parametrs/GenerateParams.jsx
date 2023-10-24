import React from 'react'
import cl from './Parametrs.module.css'
import InputRange from '../InputRange/InputRange'
import InputText from '../InputText/InputText'
import MySelect from '../MySelect/MySelect'
import MyCheckBox from '../MyCheckBox/MyCheckBox'
import testMob from '../../../../../store/neuralWindow.tsx'

const renderSwitch = (value, id, func) => {
    const key = Object.keys(value)
    const type = value[key].type
    switch(type) {
        case 'select':
            return <MySelect key={id} keyValue={key} name={value[key].name} defaultV={value[key].default} options={value[key].values} description={value[key].description} getValue={func}/>
        case 'text':
            return <InputText key={id} keyValue={key} name={value[key].name} description={value[key].description} getValue={func}/>
        case 'range':
            return <InputRange key={id} keyValue={key} name={value[key].name} defaultV={value[key].default} range={value[key].range} description={value[key].description} getValue={func}/>
        case 'boolean':
            return <MyCheckBox key={id} keyValue={key} name={value[key].name} defaultV={value[key].default === 'True' ?  true :  false} description={value[key].description} getValue={func}/>
    }
}

const GenerateParams = ({renderValue,setRenderValue}) => {
    const paramsToRender = testMob.parametrs
    let defaultRenderValue = testMob.defaultValue
    const neuralName = testMob.activeNeuralName

    const sendValuesForRender = (value, str) => {
        setRenderValue({...renderValue,[str]:value})
        // renderValue = ({...renderValue,[str]:value})
    }
    
    return (
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
    )
}

export default GenerateParams