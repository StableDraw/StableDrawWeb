import React, { useEffect, useState } from 'react'
import cl from './InputText.module.css'
import Tooltip from '@mui/material/Tooltip';
import testMob from '../../../../../store/neuralWindow.jsx'


const InputText = ({ getValue, name, description, defaultV, keyValue, isValidParam }) => {
	const [value, setValue] = useState(defaultV)

	useEffect(() => { setValue(defaultV) }, [testMob.currentModel, testMob.activeNeuralName])

	const call = (e) => {
		setValue(e.target.value)
	}

	return (
		<>
			{
				isValidParam() && <div className={cl.cont}>
					<div className={cl.main__cont}>
						<span className={cl.text}>{name}</span>
						<input
							type='text'
							placeholder='Ввод текста...'
							className={cl.input}
							value={value}
							onChange={e => call(e)}
							onBlur={() => getValue(value, keyValue)}
						/>
					</div>
					<div className={cl.question}>
						<Tooltip title={description}>
							<img className={cl.paramImg} src='Question.svg' alt='' />
						</Tooltip>
					</div>
				</div>
			}
		</>

	)
}

export default InputText