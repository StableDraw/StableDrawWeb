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
    const renderSwitch2 = (value) => {
        const type = value.type
              
        switch(type) {
            case 'select':
                return <MySelect name={value.name}  options={value.values} description={value.description} getValue={sendValuesForRender}/>
            case 'int':
                break
            case 'range': 
                return <InputRange name={value.name} range={value.range} description={value.description} getValue={sendValuesForRender}/>
            case 'check': 
                console.log('тут будет check')
                break
        }
    }
    const json = '{"image_count_input": 1,"description": "","params": {"ckpt": {"default": "ColorizeArtistic_gen","values": "ColorizeArtistic_gen;ColorizeArtistic_gen_GrayScale;ColorizeArtistic_gen_Sketch;ColorizeArtistic_gen_Sketch2Gray","description": "Выберите модель из списка для дальнейшего использования","type": "select","name": "Выбор модели"},"steps":{"default": 1,"description": "Выберите количество шагов обработки","type": "range","range": {"low": 0, "high": 100},"name": "Количество шагов обработки"}}}'
    const test = '{"colorizer":{"image_count_input":1,"description":"","params":{"ckpt":{"type":"select","default":"ColorizeArtistic_gen","values":"ColorizeArtistic_gen;ColorizeArtistic_gen_GrayScale;ColorizeArtistic_gen_Sketch;ColorizeArtistic_gen_Sketch2Gray","description":"Выберите модель из списка для дальнейшего использования","name":"Выбор модели"},"steps":{"type":"range","default":1,"description":"Выберите количество шагов обработки","range":[0,1000],"name":"Количество шагов обработки"},"compare":{"type":"boolean","default":"False","description":"При выборе данного параметра вы будете сравнивать изображение с оригиналом","name":"Сравнивать с оригиналом"},"artistic":{"type":"boolean","default":"True","description":"При выборе данного параметра вы будете использовать дополнительную модель для обработки изображения","name":"Дополнительная модель для обработки"},"render_factor":{"type":"range","default":12,"description":"Выберите значение фактора обработки изображения","range":[7,45],"name":"Фактор обработки"},"post_process":{"type":"boolean","default":"True","description":"При выборе данного параметра вы будете постобрабатывать изображение","name":"Постобработка"},"clr_saturation_factor":{"type":"range","default":1,"description":"Выберите значение коэффициента для увеличения цветовой насыщенности","range":[0,10],"name":"Коэффициент увеличения цветовой насыщенности"},"line_color_limit":{"type":"range","default":100,"description":"Выбирается минимальная яркость пискеля, при которой цветовая насыщенность увеличиваться не будет","range":[0,1000],"name":"Минимальная яркость пикселя"},"clr_saturate_every_step":{"type":"boolean","default":"True","description":"При выборе данного параметра вы будете повышать цветовую насыщенность после каждого шага","name":"Повышать цветовую насыщенность после каждого шага"}}}}'

    
    console.log(JSON.parse(test))
    const newObj = JSON.parse(json)
    const parametrs = newObj.params
    const paramsToRender = []
    for(const [key,value] of Object.entries(parametrs)) {
        paramsToRender.push(value)
        console.log(paramsToRender)
    }
    const [renderValue, setRenderValue] = useState({
        text: 'default',
        select: 'default',
        range: '1',  
        checkBox: false,
    })
    const sendValuesForRender = (value, str) => {
        setRenderValue({...renderValue,[str]:value})
    }
    
    // const renderSwitch = (type) => {
    //     switch(type) {
    //         case 'Апскейл': 
    //             return (
    //                 <div>
    //                     {paramsToRender.map(params => {
    //                         renderSwitch2(params)
    //                     })}
    //                 </div>
    //             )
    //         case 'Генерация по тексту':
    //             return (
    //                 <div>
    //                     <MySelect/>
    //                     <MySelect/>
    //                     <MySelect/>
    //                 </div>
    //             )
    //         case 'Генерация по описанию':
    //             return (
    //                 <div>
    //                     <InputRange/>
    //                     <InputRange/>
    //                     <InputRange/>
    //                 </div>
    //             )
    //     }
    // }
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
                {paramsToRender.map(param => 
                    renderSwitch2(param)
                )}
            </div>
        </div>
        <button onClick={()=>closeModal()} className={cl.cancel}>Отмена</button>
        <button className={cl.generate} onClick={()=>console.log(renderValue)}>Сгенерировать</button>
    </div>
  )
}

export default Parametrs