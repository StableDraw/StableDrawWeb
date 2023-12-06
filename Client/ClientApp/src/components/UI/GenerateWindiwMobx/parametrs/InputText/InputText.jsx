import React, { useState } from 'react'
import cl from './InputText.module.css'
import Tooltip from '@mui/material/Tooltip';

const InputText = ({ getValue, name, description, defaultV, keyValue, isValidParam }) => {
	const [value, setValue] = useState(defaultV)
	const call = (e) => {
		setValue(e.target.value)
	}

	return (
		<>
			{
				isValidParam() && <article className={cl.param}>
					<div className={cl.container}>
						<span className={cl.text}>{name}</span>
						<input
							type='text'
							placeholder='Ввод текста...'
							className={cl.input}
							value={value}
							onChange={e => call(e)}
							onBlur={() => getValue(value, keyValue)}
						/>
						<Tooltip title={description}>
							<img className={cl.paramImg} src='Question.svg' alt='' />
						</Tooltip>
					</div>
				</article>
			}
		</>

	)
}

export default InputText