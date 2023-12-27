import Tooltip from "@mui/material/Tooltip";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import store from "../../../../../store/neuralWindow.jsx";
import cl from "./InputText.module.css";

const InputText = observer(({ getValue, name, description, defaultV, keyValue, isValidParam }) => {
	const [value, setValue] = useState(defaultV);
	// const [isVisible, setIsVisible] = useState(true); // В будущем для обработки checkBox

	useEffect(() => {
		setValue(defaultV);
	}, [store.currentModel, store.activeNeuralName]);

	//в будущем будет использоваться для обработки изменений родительских checkBox
	// useEffect(() => {
	// 	!store.childParams.includes(keyValue[0]) ? setIsVisible(false) : setIsVisible(true);
	// }, [store.childParams.length]);

	const call = (e) => {
		setValue(e.target.value);
	};
	return (
		<>
			{isValidParam() && (
				<div className={cl.cont}>
					<div className={cl.main__cont}>
						<span className={cl.text}>{name}</span>
						<input
							type="text"
							placeholder="Ввод текста..."
							className={cl.input}
							value={value}
							onChange={(e) => call(e)}
							onBlur={() => getValue(value, keyValue)}
						/>
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
});

export default InputText;
