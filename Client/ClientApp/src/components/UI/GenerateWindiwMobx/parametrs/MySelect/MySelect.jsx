import React, { useEffect, useState } from 'react'
import cl from './MySelect.module.css'
import Tooltip from '@mui/material/Tooltip';
import testMob from '../../../../../store/neuralWindow.jsx'

const MySelect = ({ getValue, name, description, options, keyValue, defaultV, setChild }) => {
	const [value, setValue] = useState(defaultV);

	useEffect(() => {
		// if (!((keyValue[0] === "model" || keyValue[0] === "version") && options.some(value => value.hasOwnProperty("childs"))))
		// 	setValue(defaultV);

		setChild(testMob.currentModel); // заполняем массивы параметров, при смене модели генерации
		testMob.doDefaultValues(); //заполняем объект из параметров для отправки на сервер при смене модели генерации
	}, [testMob.currentModel, testMob.activeNeuralName]);

	useEffect(() => {
		setValue(defaultV)
	}, [testMob.activeNeuralName])

	//устанавливаем текущую модель генерации для дальнейшего вывода специальных параметров
	const setCurrentModel = (value) => {
		if ((keyValue[0] === "model" || keyValue[0] === "version") && options.some(value => value.hasOwnProperty("childs"))) {
			testMob.setCurrentModel(value);
			setChild(value); //Заполняет массив из дочерних параметров
		}
	}

	const call = (e) => {
		setCurrentModel(e.target.value);
		setValue(e.target.value);
	}

	//возвращает true, если в массиве дочерних параметров содержится текущий параметр со свойством child
	const isChildMatch = () => {
		return testMob.childParams.includes(keyValue[0])
	}

	//возвращает true, если хотя бы один элемент в массиве options содержит свойство "child"
	const isAnyChild = () => {
		return options.some(value => value.hasOwnProperty("child"));
	}

	//проверка валидности значений селекторов
	const isValid = (value, valueObject) => {
		return !(!testMob.childValues.includes(value) && valueObject.hasOwnProperty("child"))
	}

	return (
		<>
			{
				!isAnyChild() ?
					<div className={cl.cont}>
						<div>
							<span className={cl.paramText} style={{ marginRight: 40 }}>{name}</span>
								<select className={cl.select} value={value} onChange={e => { call(e); }} onBlur={() => { getValue(value, keyValue) }}>
									{options.map(({ name, value, description, system }, id) => {
										if (!system)
											return <option key={id} value={value}>{name}</option>
									})}
								</select>
						</div>
						<div>
							<Tooltip title={description}>
								<img className={cl.paramImg} src='Question.svg' alt='' />
							</Tooltip>
						</div>
					</div> : isChildMatch() ?
						<div className={cl.cont}>
							<div>
								<span className={cl.paramText} style={{ marginRight: 40 }}>{name}</span>
								<section className={cl.block2}>
									<select className={cl.select} value={value} onChange={e => { call(e); }} onBlur={() => { getValue(value, keyValue) }}>
										{options.map(({ name, value, description, system }, id) => {
											if (!system)
												return isValid(value, options[id]) && <option key={id} value={value}>{name}</option>
										})}
									</select>
								</section>
							</div>
							<div>
								<Tooltip title={description}>
									<img className={cl.paramImg} src='Question.svg' alt='' />
								</Tooltip>
							</div>
						</div> : <></>
			}
		</>


	)
}

export default MySelect