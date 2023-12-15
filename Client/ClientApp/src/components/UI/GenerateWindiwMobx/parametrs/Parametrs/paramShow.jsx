import { useEffect, useState } from 'react';
import { ParamSwitchType } from './paramSwitchType.jsx'
import cl from './Parametrs.module.css'


//компонент отвечает за логику отображения параметров в одну/две колонки


export const ParamShow = ({ param, key, setValueForServer }) => {
	//количество параметров, расположенных в 2 колонки
	const [narrowParamsCount, setNarrowParamsCount] = useState(0);
	const [isNarrowParam, setIsNarrowParam] = useState(false);

	const paramName = Object.keys(param); //название параметра(системное) в массиве

	useEffect(() => {
		if (!param[paramName].hasOwnProperty("main"))
			setIsNarrowParam(true);
	}, [])

	// const isNarrowParam = () => {
	// 	return !param[paramName].hasOwnProperty("main");
	// }
	//Проблема: в зависимости от main менять нужно внешний контейнер ParamList x(
	return (
		<>
			{
				isNarrowParam ?
					<div className={cl.paramsRow}>

					</div> :
					<ParamSwitchType param={param} key={key} setValueForServer={setValueForServer} />
			}
		</>
	)
}