import React, { useEffect, useState } from 'react'
import './Caption.css'
import Tooltip from '@mui/material/Tooltip';
import testMob from '../../../../../store/neuralWindow.jsx'

const Caption = ({ setCaption }) => {
	const [value, setValue] = useState('');
	useEffect(() => {
		setCaption(value)
	}, [value])

	useEffect(() => {
		setValue('')
	}, [testMob.activeNeuralName])

	const call = (e) => {
		setValue(e.target.value)
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
					<img className='paramImg' src='Question.svg' alt=''/>
				</Tooltip>
			</div>
		</article>)
}

export default Caption