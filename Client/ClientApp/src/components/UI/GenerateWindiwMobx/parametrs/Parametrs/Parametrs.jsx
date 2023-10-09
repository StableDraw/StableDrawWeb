import React, { useEffect, useState } from 'react'
import InputRange from '../InputRange/InputRange'
import InputText from '../InputText/InputText'
import MySelect from '../MySelect/MySelect'
import MyCheckBox from '../MyCheckBox/MyCheckBox'
import cl from './Parametrs.module.css'
import api from '../../../../../api/apiNeurals'
import testMob from '../../../../../store/neuralWindow.tsx'
import {observer} from 'mobx-react-lite'
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


const Parametrs = observer(({closeWindow, closeParam,}) => {
    
    const [file, setFile] = useState()
    const [showParam, setShowParam] = useState(false)

    const paramsToRender = testMob.parametrs
    let renderValue = testMob.defaultValue
    const neuralName = testMob.activeNeuralName

    const closeModal = () => {
        closeWindow(false)
        closeParam(false)
    }
    const sendValuesForRender = (value, str) => {
        renderValue = ({...renderValue,[str]:value})
        console.log(renderValue)
    }
    
    const goOnServer = async () => {
        const formData = new FormData()
        formData.append('NeuralType', neuralName)
        formData.append('Parameters', JSON.stringify(renderValue))
        formData.append('Caption', "")
        formData.append('Prompts', ["lalala", "kfkf"])
        formData.append('ImagesInput', file)
        try {
            const response = await api.RunNeural(formData)
            const image = response.data[0]
            setFile(image)
        } catch(e) {
            console.error(e)
            throw(e)
        }
    }
  return (
    <div>
        <div 
            className={cl.image}
            onMouseOver={()=>setShowParam(true)}
            onMouseOut={()=>setShowParam(false)}
        >
            <img className={showParam ? cl.backgroundImage : cl.img} src={file ? URL.createObjectURL(file) : 'StableDrawLogo.png'}/>
            {/* <input type='file' multiple={true} onChange={e=>setFile(e.target.files[0])}/> */}
            {/* <img src={"data:image/png;base64," + file} /> */}
            <div className={showParam ? cl.downloadActive : cl.download}>
                <button className={cl.imgBtn} onClick={()=>closeModal()}>
                    <img src='goToCanvas.png'/>
                </button>
                <label className={cl.imgBtn}>
                    <img src='addImage.png'/>
                    <input style={{display:'none'}}  type='file' multiple={true} onChange={e=>setFile(e.target.files[0])}/>
                </label>
                <button className={cl.imgBtn} onClick={()=> setFile()}>
                    <img src='deleteImg.png'/>
                </button>
            </div>
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
})

export default Parametrs




