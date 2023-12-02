import React, { useEffect, useState } from 'react'
import cl from './MyCheckBox.module.css'
import Tooltip from '@mui/material/Tooltip';
import testMob from '../../../../../store/neuralWindow.jsx'


const MyCheckBox = ({ getValue, name, defaultV, description, keyValue, isValidParam}) => {

	const [value, setValue] = useState(defaultV)

	useEffect(() => {setValue(defaultV)}, [testMob.currentModel])

	return (
		<>
		{
			isValidParam() && <article className={cl.param}>
			<div className={cl.container}>
				<section className={cl.block}>
					<span className={cl.text}>{name}</span>
				</section>
				<section className={cl.block2}>
					<label className={cl.switch}>
						<input checked={value} type="checkbox" onChange={() => setValue(!value)} onBlur={() => getValue(value, keyValue)} />
						<span className={cl.slider_round} />
					</label>
					<Tooltip title={description}>
						<img className={cl.paramImg} src='Question.svg' alt='' />
					</Tooltip>
				</section>
			</div>
		</article>
		} 
		</>
	)
}
export default MyCheckBox