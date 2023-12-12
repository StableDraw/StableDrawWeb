import React from 'react'
import cl from './NeuralCard.module.css'
import { Tooltip } from '@mui/material'
import testMob from '../../../../store/neuralWindow.jsx'
import { observer } from 'mobx-react-lite'

const NeuralCard = observer(({ serverName, clientName, description, active, }) => {
	const getParametrs = () => {
		//функция не сработает, если нажать на уже выбранную нейросеть
		if (serverName === testMob.activeNeuralName)
			return;

		active(true)
		testMob.getParams(serverName)
	}

	const image = `${serverName}.png`
	return (
		<Tooltip title={description} placement='right'>
			<div className={testMob.activeNeuralName === serverName ? cl.itemActive : cl.item} onClick={getParametrs}>
				<div>
					<img src={image} className={cl.itemImg} alt='' />
				</div>
				<span className={cl.itemText}>{clientName}</span>
			</div>
		</Tooltip>

	)
})

export default NeuralCard