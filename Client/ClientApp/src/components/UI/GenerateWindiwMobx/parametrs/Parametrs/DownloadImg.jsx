import React,{useEffect, useState} from 'react'
import cl from './Parametrs.module.css'
import { Tooltip } from '@mui/material'
import canvasState from '../../../../../store/canvasState.tsx'
import { observer } from 'mobx-react-lite'

const getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
};

const DownloadImg = observer(({closeWindow, closeParam,setRenderValue}) => {

    let [file, setFile] = useState()

    const img = canvasState.getImgSrc()
    const imgFromCanvas = `${img}`

    useEffect(()=>{    
        setRenderValue(imgFromCanvas)
    },[img])

    const [showParam, setShowParam] = useState(false)
    
      const handleFileInputChange = e => {
        let file = e.target.files[0];
        getBase64(file)
          .then(result => {
            setFile(`${result}`)
            setRenderValue(`${result}`)
          })
          .catch(err => {
            console.log(err);
          });
    }

    const closeModal = () => {
        closeWindow(false)
        closeParam(false)
    }

  return (
        <div 
            className={cl.image}
            onMouseOver={()=>setShowParam(true)}
            onMouseOut={()=>setShowParam(false)}
        >
            <img className={showParam ? cl.backgroundImage : cl.img} src={file ? file : imgFromCanvas? imgFromCanvas : 'StableDrawLogo.png'}/>
            <div className={showParam ? cl.downloadActive : cl.download}>
                <Tooltip title='Дорисовать' placement='top'>
                    <button className={cl.imgBtn} onClick={()=>closeModal()}>
                        <img src='goToCanvas.png'/>
                    </button>
                </Tooltip>
                <Tooltip title='Загрузить с ПК' placement='top'>
                    <label className={cl.imgBtn}>
                        <img src='addImage.png'/>
                        <input style={{display:'none'}}  type='file' multiple={true} onChange={handleFileInputChange}/>
                    </label>
                </Tooltip>
                <Tooltip title='Убрать' placement='top'>
                    <button className={cl.imgBtn} onClick={()=> setFile()}>
                        <img src='deleteImg.png'/>
                    </button>
                </Tooltip>

            </div>
        </div>  
    )
})

export default DownloadImg