import React, { useState } from 'react'
import InputRange from '../InputRange/InputRange'
import InputText from '../InputText/InputText'
import MySelect from '../MySelect/MySelect'
import MyCheckBox from '../MyCheckBox/MyCheckBox'
import cl from './Parametrs.module.css'
import api from '../../../../../api/apiNeurals'
import testMob from '../../../../../store/neuralWindow.tsx'
import {observer} from 'mobx-react-lite'
import DownloadImg from './DownloadImg'
import Caption from '../Caption/Caption.tsx'

const renderSwitch = (value, id, func) => {
    const key = Object.keys(value)
    const type = value[key].type
    switch(type) {
        case 'select':
            return <MySelect key={id} keyValue={key} name={value[key].name} defaultV={value[key].default} options={value[key].values} description={value[key].description} getValue={func}/>
        case 'text':
            return <InputText key={id} keyValue={key} name={value[key].name} defaultV={value[key].default} description={value[key].description} getValue={func}/>
        case 'range':
            return <InputRange key={id} keyValue={key} name={value[key].name} defaultV={value[key].default} range={value[key].range} description={value[key].description} getValue={func}/>
        case 'boolean':
            return <MyCheckBox key={id} keyValue={key} name={value[key].name} defaultV={value[key].default === 'True' ?  true :  false} description={value[key].description} getValue={func}/>
    }
}
function dataURItoBlob (dataURI) {

    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];


    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
}

const Parametrs = observer(({closeWindow, closeParam,}) => {

    const [file, setFile] = useState()
    const [result, setResult] = useState('')
    const paramsToRender = testMob.parametrs
    const isCaption = testMob.caption
    let renderValue = testMob.defaultValue
    const neuralName = testMob.activeNeuralName
    let caption = ''

    const closeModal = () => {
        closeWindow(false)
        closeParam(false)
    }
    const setCaption = (value) => {
        caption = value
    }
    const sendValuesForRender = (value, str) => {
        renderValue = ({...renderValue,[str]:value})
    }
    const goOnServer = async () => {
        const formData = new FormData()

        let blob = dataURItoBlob(file);
        formData.append('NeuralType', neuralName)
        formData.append('Parameters', JSON.stringify(renderValue))
        formData.append('Caption', caption)
        formData.append('Prompts', ["", ""])//надо узнать че это такое
        formData.append('ImagesInput', blob)

        try {
            const response = await api.RunNeural(formData)
            const image = response.data.images[0]
      
            setResult(`data:image/png;base64, ${image}`)//никуда не выводится результат
            console.log('done')
        } catch(e) {
            console.error(e)
            throw(e)
        }
    }
  return (
    <div>
        <DownloadImg closeWindow={closeWindow} closeParam={closeParam} setRenderValue={setFile}/>
        <div className={cl.params}>
            <div style={{display:'flex'}}>
            {/* инлайн стиль плохо, на скорую руку */}
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
                {isCaption? <Caption setCaption={setCaption}/> : undefined}
                {paramsToRender.map((param, id) => renderSwitch(param,id,sendValuesForRender))}
            </div>
        </div>
        <button onClick={()=>closeModal()} className={cl.cancel}>Отмена</button>
        <button className={cl.generate} onClick={()=>goOnServer()}>Сгенерировать</button>
    </div>
  )
})

export default Parametrs




