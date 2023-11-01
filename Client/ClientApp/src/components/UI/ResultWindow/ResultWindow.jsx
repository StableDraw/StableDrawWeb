import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import {Modal} from '@mui/material'
import cl from './ResultWindow.module.css'
import ResultWindowState from './ResultWindowState.ts'

const ResultWindow = observer(() => {
    const [isOpen, setIsOpen] = useState(ResultWindowState.isOpen)
    const image = `${ResultWindowState.getImage()}`
  return (
        <div className={cl.test}>
            <Modal open={isOpen} className={cl.modalWindow} sx={{  border: '2px solid #000'}}>
            <div className={cl.modal}>
                <header className={cl.header}>
                    <button className={cl.closeBtn} onClick={()=>setIsOpen(false)}>
                        <img src='Close.svg'/>
                    </button>
                </header>
                <main className={cl.main}>
                        <section className={cl.imgResultDiv}>
                            <img  className ={cl.imgResult} src={image}/>
                        </section>
                        <section className={cl.navigate}>
                            <button className={cl.open3D}>Открыть 3D модуль</button>
                            <button className={cl.goToCanvas}>Назад к редактору</button>
                            <button className={cl.downloadImg}>Скачать</button>
                        </section>
                </main>
            </div>
            </Modal>
        </div>
  )
})

export default ResultWindow