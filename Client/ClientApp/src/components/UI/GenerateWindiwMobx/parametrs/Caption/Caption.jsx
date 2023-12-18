import React, { useEffect, useState } from 'react'
import './Caption.css'
import Tooltip from '@mui/material/Tooltip';
import store from '../../../../../store/neuralWindow.jsx'
import { observer } from 'mobx-react-lite'

const Caption = observer(() => {
	const [values, setValues] = useState([]); // состояние описаний
	const [isValidInput, setIsValidInput] = useState(true)

	useEffect(() => {
		if (!values.length) {
			let fillArray = []
			for (let i = 0; i < store.captionAmount; i++) {
				fillArray.push('');
			}
			setValues(fillArray);
		}

		store.setCaption(values);
		if(values.some((value) => !lngType(value) && value))
			setIsValidInput(false);
		else
			setIsValidInput(true);

	}, [values])

	useEffect(() => {
		setValues([])
	}, [store.activeNeuralName, store.currentModel]);


	const call = (e, index) => {
		let newValues = [...values];
		newValues[index] = e.target.value;
		setValues(newValues)
	}

	// проверяем язык ввода
	const lngType = (text) => {
		let eng = /^[\w\s\d.,!?"';*=<>@%:&+()-/|\\`~$#№^\{\}\[\]]+$/
		return text.match(eng)
	}
	console.log(store.captionAmount);
	return (
		<>
			{
				<div className='captionsBlock'>
					{values.map((value, i) => <div className='cont'>
						<div className='cont__caption'>
							<span className='text'>Описание</span>
							<textarea
								placeholder='Ввод текста...'
								className={store.captionAmount === 2 ? `${'input'} ${`input__2`}` : 'input'}
								value={value}
								onChange={e => call(e, i)} />

						</div>
						{store.captionAmount !== 2 && <div className='question'>
							<Tooltip title='Caption'>
								<img className='paramImg' src='Question.svg' alt='' />
							</Tooltip>
						</div>}
					</div>)}
					{store.captionAmount === 2 && <div className='question'>
						<Tooltip title='Caption'>
							<img className='paramImg' src='Question.svg' alt='' />
						</Tooltip>
					</div>}
					{!isValidInput &&
						<span className={store.captionAmount === 2 ? `${'attentionTxt'} ${'attentionTxt__2'}` : 'attentionTxt'}>*На данный момент описание доступно только на английском языке</span>}
				</div>}
		</>
	)
})

export default Caption