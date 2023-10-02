import cl from './RightPanel.module.css'

import Zaglushka from '../parametrs/Zaglushka/Zaglushka'
import Parametrs from '../parametrs/Parametrs/Parametrs'
import { useState } from 'react'
const RightPanel = ({closeWindow, showParam, closeParam, parametrs, neuralName}) => {
  console.log(parametrs)
  
  return (
    <section className={cl.mainContent}>
        <div className={cl.mainContent2}>
            {showParam && parametrs ? <Parametrs neuralName={neuralName} json={parametrs}  closeParam={closeParam} closeWindow={closeWindow}/> : <Zaglushka/>}
        </div>
    </section>
  )
}

export default RightPanel