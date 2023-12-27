import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import store from "../../../../../store/neuralWindow.jsx";
import cl from "./MyCheckBox.module.css";

const MyCheckBox = ({ getValue, name, defaultV, description, keyValue, isValidParam, isChilds }) => {
	const [value, setValue] = useState(defaultV);

	useEffect(() => {
		setValue(defaultV);
	}, [store.currentModel, store.activeNeuralName]);

	useEffect(() => {
		if (isChilds) setChilds();
	}, [value, store.currentModel]);

	//Обработка дочерних параметров checkBox
	const setChilds = () => {
		let childValues = [];
		const childParams = isChilds.map((child) => child.param_id);
		isChilds.forEach((child) => {
			childValues = [...childValues, ...child.values_id];
		});

		//если значение чекбокса - false, то убираем Сhilds из массива дочерних параметров
		if (!value) {
			//чистим массив дочерних значений
			const newChildValues = store.childValues.filter((value) => {
				return !childValues.includes(value);
			});

			//чистим массив дочерних параметров
			const newChildParams = store.childParams.filter((param) => {
				return !childParams.includes(param);
			});

			store.clearChildParams();
			store.clearChildValues();
			newChildParams.forEach((param) => store.setChildParams(param));
			store.setChildValues(newChildValues);
		}

		//если значение чекбокса - true и хотя бы одного дочернего параметра чекбокса нет в store
		if (value && childParams.some((param) => !store.childParams.includes(param))) {
			childParams.forEach((param) => store.setChildParams(param));
			store.setChildValues(childValues);
		}
	};

	return (
		<>
			{isValidParam() && (
				<div className={cl.cont}>
					<div className={cl.main__cont}>
						<section className={cl.block}>
							<span className={cl.text}>{name}</span>
						</section>
						<label className={cl.switch}>
							<input
								checked={value}
								type="checkbox"
								onChange={() => setValue(!value)}
								onBlur={() => getValue(value, keyValue)}
							/>
							<span className={cl.slider_round} />
						</label>
					</div>
					<div className={cl.question}>
						<Tooltip title={description}>
							<img className={cl.paramImg} src="Question.svg" alt="" />
						</Tooltip>
					</div>
				</div>
			)}
		</>
	);
};
export default MyCheckBox;
