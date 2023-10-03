import React, { useState } from 'react'
import cl from './GenerateBtn.module.css'
import LeftPanel from '../LeftPanel/LeftPanel'
import RightPanel from '../RightPanel/RightPanel'
import { Modal } from '@mui/material';
import api from '../../../../api/apiNeurals'
const GenerateBtn = () => {
    const [modal, setModal] = useState(false)
    const [openParam, setOpenParam] = useState(false)
    const [neuralName, setNeuralName] = useState()
    const [parametrs, setParametrs] = useState()
    const [neuralList, setNeuralList] = useState()
    let rootClasses = [cl.modal]
    if(modal) {
        rootClasses.push(cl.activeModal)
    }
    const hundleOpen = async () => {
        setModal(!modal)
        try {
            const list = await api.GetNeuralsList()
            console.log(list.data)
            // const array = list.data.map(name => name.neuralName)
            // console.log(array)
            setNeuralList(list.data)
        } catch(e) {
            console.error(e)
            throw(e)
        }
    }
    const closeBtn = () => {
        setModal(!modal)
        setOpenParam(false)
    }
  return (
    <div>
        <button className={cl.button} onClick={()=>hundleOpen()}><p>Генерация</p></button>
        <Modal open={modal}>
            <div className={rootClasses.join(' ')}>
                <header className={cl.header}>
                    <button className={cl.close} onClick={()=>closeBtn()}>
                        <img src='Close.svg'/>
                    </button>
                </header>
                <div className={cl.content}> 
                    <LeftPanel neuralsList={neuralList} setNeuralName={setNeuralName} setParametrs={setParametrs} openParam={setOpenParam}/>
                    <RightPanel neuralName={neuralName} parametrs={parametrs}  showParam={openParam} closeWindow={setModal} closeParam={setOpenParam}/>
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default GenerateBtn