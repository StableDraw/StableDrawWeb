import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import {Modal, InputLabel} from '@mui/material'
import cl from './ResultWindow.module.css'
import ResultWindowState from './ResultWindowState.ts'
import BabylonModule from '../BabylonModule/BabylonBtn'
const ResultWindow = observer(() => {
    const image = `${ResultWindowState.getImage()}`
return (
    <Modal open={ResultWindowState.isOpen} className={cl.modalWindow} sx={{  border: '2px solid #000'}}>
        <div className={cl.modal}>
            <header className={cl.header}>
                <button className={cl.closeBtn} onClick={()=>ResultWindowState.setIsOpen(false)}>
                    <img src='Close.svg'/>
                </button>
            </header>
            <main className={cl.main}>
                    <section className={cl.imgResultDiv}>
                        <img  className ={cl.imgResult} src={image}/>
                    </section>
                    <section className={cl.navigate}>
                        <BabylonModule/>
                        <button 
                            className={cl.goToCanvas} 
                            onClick={()=>ResultWindowState.setIsOpen(false)}
                        >
                            Назад к редактору
                        </button>

                        <a  className={cl.downloadImg}
                            href={ResultWindowState.getImage()}
                            download="StableDrawImg"
                            target="_blank"
                            rel="noreferrer"
                            style={{textDecoration:'none'}}
                        >
                            <p  className={cl.downloadImgText}>Скачать</p>
                        </a>
                    </section>
            </main>
        </div>
    </Modal>
  )
})

export default ResultWindow