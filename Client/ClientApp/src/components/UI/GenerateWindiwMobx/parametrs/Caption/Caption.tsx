import React, { useEffect, useState } from 'react'
import './Caption.css'
import Tooltip from '@mui/material/Tooltip';
import store from '../../../../../store/neuralWindow.jsx'
import { observer } from 'mobx-react-lite'

const Caption = observer(() => {
	const [value, setValue] = useState('');
	const [isValidInput, setIsValidInput] = useState(true)

	useEffect(() => {
		store.setCaption(value)

		if (!lngType(value) && value)
			setIsValidInput(false);
		else
			setIsValidInput(true);

	}, [value])

	useEffect(() => {
		setValue('')
	}, [store.activeNeuralName])

	const call = (e) => {
		setValue(e.target.value)
	}

	// проверяем язык ввода
	const lngType = (text) => {
		let eng = /^[\w\s\d.,!?"';*=<>@%:&+()-/|\\`~$#№^\{\}\[\]]+$/
		return text.match(eng)
	}

	return (
			<div className='cont'>
				<div>
					<span className='text'>Описание</span>
					<textarea
						placeholder='Ввод текста...'
						className='input'
						value={value}
						onChange={e => call(e)}/>
						{!isValidInput &&
				<span className='attentionTxt'>*На данный момент описание доступно только на английском языке</span>}
				</div>
				<div>
					<Tooltip title='Caption'>
						<img className='paramImg' src='Question.svg' alt='' />
					</Tooltip>
				</div>
			</div>
	)
})

export default Caption