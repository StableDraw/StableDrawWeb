import React from 'react'
import { observer } from 'mobx-react-lite'
import {Modal} from '@mui/material'
import cl from './ResultWindow.module.css'
import ResultWindowState from './ResultWindowState.ts'
import BabylonModule from '../BabylonModule/BabylonBtn'
const ResultWindow = observer(() => {
    const img = `data:image/png;base64,${ResultWindowState.getImage()}`
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
                        <img  className ={cl.imgResult} src={img}/>
                    </section>
                    <section className={cl.navigate}>
                        <BabylonModule img={img}/>
                        <button 
                            className={cl.goToCanvas} 
                            onClick={()=>ResultWindowState.setIsOpen(false)}
                        >
                            Назад к редактору
                        </button>

                        <a  className={cl.downloadImg}
                            href={img}
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