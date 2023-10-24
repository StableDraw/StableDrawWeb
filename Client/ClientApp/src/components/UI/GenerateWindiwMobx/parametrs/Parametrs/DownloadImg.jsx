import React,{useState} from 'react'
import cl from './Parametrs.module.css'

const DownloadImg = ({closeWindow, closeParam,setRenderValue}) => {

    const [file, setFile] = useState()
    const [showParam, setShowParam] = useState(false)
    const test = (img) => {
        setFile(img)
        setRenderValue(img)    
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
            <img className={showParam ? cl.backgroundImage : cl.img} src={file ? URL.createObjectURL(file) : 'StableDrawLogo.png'}/>
            {/* <img src={"data:image/png;base64," + file} /> */}
            <div className={showParam ? cl.downloadActive : cl.download}>
                <button className={cl.imgBtn} onClick={()=>closeModal()}>
                    <img src='goToCanvas.png'/>
                </button>
                <label className={cl.imgBtn}>
                    <img src='addImage.png'/>
                    <input style={{display:'none'}}  type='file' multiple={true} onChange={e=>test(e.target.files[0])}/>
                </label>
                <button className={cl.imgBtn} onClick={()=> setFile()}>
                    <img src='deleteImg.png'/>
                </button>
            </div>
        </div>  
    )
}

export default DownloadImg