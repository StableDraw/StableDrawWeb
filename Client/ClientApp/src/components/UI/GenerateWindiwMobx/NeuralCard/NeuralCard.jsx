import React from 'react'
import cl from './NeuralCard.module.css'
import { Tooltip } from '@mui/material'
import testMob from '../../../../store/neuralWindow.jsx'
import { observer } from 'mobx-react-lite'

const NeuralCard = observer(({ serverName, clientName, description, active, imgCount }) => {
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
					<img src={image} className={cl.item__Img} alt='' />
				</div>
				<div className={cl.item__info}>
					<span className={cl.item__Text}>{clientName}</span>
					<div className={cl.item__pictures}>
						<span className={cl.item__numTxt}>
							{imgCount}
						</span>
						<img src="./neuralWindow/images.svg" alt="" />
					</div>
				</div>
			</div>
		</Tooltip>

	)
})

export default NeuralCard