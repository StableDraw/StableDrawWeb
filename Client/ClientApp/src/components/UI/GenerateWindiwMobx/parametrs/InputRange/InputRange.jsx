import React, { useEffect, useState } from 'react'
import cl from './InputRange.module.css'
import Tooltip from '@mui/material/Tooltip';
import testMob from '../../../../../store/neuralWindow.jsx'

const InputRange = ({ getValue, description, defaultV, max, min, step, name, keyValue, isValidParam }) => {
	const [value, setValue] = useState(defaultV);

	useEffect(() => {setValue(defaultV)}, [testMob.currentModel, testMob.activeNeuralName])
	const call = (res) => {
		setValue(res);
	}

	//выделяет значение в ячейке, когда пользователь кликает по ней.
	//сделано для упрощения ввода
	const handleSelect = (e) => {
		e.target.select();
	};

	//убирает появляющийся в начале 0 при введении однозначного числа (нужно понять, где этот 0 хранится)
	const removeZero = (value) => {
		return Number(value.toString().replace(/^0+/, ''))
	}

	return (
		<>
			{
				isValidParam() && <article className={cl.param}>
					<div className={cl.container}>
						<span className={cl.text}>{name}</span>
						<div className={cl.inputBlock}>
							<input
								className={cl.range}
								type="range"
								min={min}
								max={max}
								value={value}
								onChange={(e) => call(+e.target.value)}
								onMouseUp={() => getValue(value, keyValue)}
								step={step}
							/>
							<input
								className={cl.number}
								type="number"
								min={min}
								max={max}
								value={value}
								onChange={(e) => call(+e.target.value)}
								onBlur={() => getValue(value, keyValue)}
								onClick={handleSelect}
								step={step}
							/>
							<Tooltip title={description}>
								<img className={cl.paramImg} src='Question.svg' alt='' />
							</Tooltip>
						</div>
					</div>
				</article>
			}
		</>

	)
}

export default InputRange