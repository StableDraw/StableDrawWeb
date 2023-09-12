import React, { useState } from 'react'
import cl from './GenerateBtn.module.css'
import LeftPanel from '../LeftPanel/LeftPanel'
import RightPanel from '../RightPanel/RightPanel'
const GenerateBtn = () => {
    const [modal, setModal] = useState(false)
    const [openParam, setOpenParam] = useState(false)
    const [neuralType, setNeuralType] = useState('')
    console.log(openParam)
    let rootClasses = [cl.modal]
    if(modal) {
        rootClasses.push(cl.activeModal)
    }
   
  return (
    <div>
        <button onClick={()=>setModal(!modal)}>генерировать</button>
        <div className={rootClasses.join(' ')}>
            <header className={cl.header}>
                <button className={cl.close} onClick={()=>setModal(!modal)}>
                    <img src='Close.svg'/>
                </button>
            </header>
            <div className={cl.content}> 
                <LeftPanel setNeuralType={setNeuralType} openParam={setOpenParam}/>
                <RightPanel neuralType={neuralType} showParam={openParam} closeWindow={setModal} closeParam={setOpenParam}/>
            </div>
        </div>
    </div>
  )
}

export default GenerateBtn