import cl from './RightPanel.module.css'

import Zaglushka from '../parametrs/Zaglushka/Zaglushka'
import Parametrs from '../parametrs/Parametrs/Parametrs'
import { useState } from 'react'
const RightPanel = ({closeWindow, showParam, closeParam, parametrs, neuralName}) => {
  const [file, setFile] = useState()
  if (file) {
    const fd = new FormData()
    fd.append('file', file)
    console.log(file)
  }
  return (
    <section className={cl.mainContent}>
        <div className={cl.mainContent2}>
            <div className={cl.image}>
                <img src='kitty.png'/>
                <input type='file' onChange={e=>setFile(e.target.files[0])}/>
            </div>
            {showParam ? <Parametrs neuralName={neuralName} json={parametrs}  closeParam={closeParam} closeWindow={closeWindow}/> : <Zaglushka/>}
        </div>
    </section>
  )
}

export default RightPanel