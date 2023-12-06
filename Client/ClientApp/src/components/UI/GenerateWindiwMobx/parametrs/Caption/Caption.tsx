import React, { useEffect, useState } from 'react'
import './Caption.css'
import Tooltip from '@mui/material/Tooltip';
import testMob from '../../../../../store/neuralWindow.jsx'

const Caption = ({ setCaption }) => {
	const [value, setValue] = useState('');
	const [isValidInput, setIsValidInput] = useState(true)

	useEffect(() => {
		setCaption(value)

		if (!lngType(value) && value)
			setIsValidInput(false);
		else
			setIsValidInput(true);

	}, [value])

	useEffect(() => {
		setValue('')
	}, [testMob.activeNeuralName])

	const call = (e) => {
		setValue(e.target.value)
	}

	// проверяем язык ввода
	const lngType = (text) => {
		let eng = /^[\w\s\d.,!?"';*=<>@%:&+()-/|\\`~$#№^\{\}\[\]]+$/
		return text.match(eng)
	}

	return (
		<article className='param'>
			<div className='cont'>
				<h3><span className='text'>Описание</span></h3>
				<textarea
					placeholder='Ввод текста...'
					className='input'
					value={value}
					onChange={e => call(e)}
				/>
				<Tooltip title='Caption'>
					<img className='paramImg' src='Question.svg' alt='' />
				</Tooltip>
			</div>
			{!isValidInput && <span className='attentionTxt'>*На данный момент описание доступно только на английском языке</span>}
		</article>)
}

export default Caption