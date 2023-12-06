import React, { useState } from 'react'
import cl from './GenerateBtn.module.css'
import LeftPanel from '../LeftPanel/LeftPanel'
import RightPanel from '../RightPanel/RightPanel'
import { Modal } from '@mui/material';
import testMob from '../../../../store/neuralWindow.jsx'

const GenerateBtn = () => {
	const [modal, setModal] = useState(false)
	const [openParam, setOpenParam] = useState(false)

	let rootClasses = [cl.modal]
	if (modal)
		rootClasses.push(cl.activeModal)
	
	testMob.getNeurals()

	const closeBtn = () => {
		setModal(false)
		setOpenParam(false)
		testMob.setActiveNeural('')
	}
	return (
		<div>
			<button className={cl.button} onClick={() => setModal(!modal)}><p>Генерация</p></button>
			<Modal open={modal}>
				<div className={rootClasses.join(' ')}>
					<header className={cl.header}>
						<button className={cl.close} onClick={() => closeBtn()}>
							<img className={cl.closeBtn} src='Close.svg' alt=''/>
						</button>
					</header>
					<div className={cl.content}>
						<LeftPanel openParam={setOpenParam} />
						<RightPanel showParam={openParam} closeWindow={setModal} closeParam={setOpenParam} />
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default GenerateBtn