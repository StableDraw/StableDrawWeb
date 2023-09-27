import React from 'react';
import barClasses from './stylesDark/sizeBar.module.css'
import barClassesLight from './stylesLight/sizeBar.module.css'
import { useState } from "react";


export const SizeBar = ({ changeModel, model, isLightTheme }) => {
	const [isBigButtonClicked, setIsBigButtonClicked] = useState(true);

	const changeButtonColor = () => {
		if(model.small && model.big)
		setIsBigButtonClicked(!isBigButtonClicked);
	}

	const modelSetUp = () => {
		if (!isBigButtonClicked && model.small)
			changeModel(model.small);

		if (isBigButtonClicked && model.big)
			changeModel(model.big);
	};

	return (
		<div className={isLightTheme ? barClassesLight.sizeBar : barClasses.sizeBar}>
			<div className={isLightTheme ? barClassesLight.buttonsSizeBar : barClasses.buttonsSizeBar}>
				<button
					className={model.big ?
						(isBigButtonClicked ? (isLightTheme ? barClassesLight.button_sizeBar_select : barClasses.button_sizeBar_select)
							: (isLightTheme ? barClassesLight.button_sizeBar : barClasses.button_sizeBar)) :
						(isLightTheme ? barClassesLight.button_sizeBarNone : barClasses.button_sizeBarNone)}
					onClick={changeButtonColor}>
					<span className={isBigButtonClicked ? (isLightTheme ? barClassesLight.text_select : barClasses.text_select)
						: (isLightTheme ? barClassesLight.text : barClasses.text)}>Большая</span>
				</button>

				<button
					className={model.small ?
						(isBigButtonClicked ? (isLightTheme ? barClassesLight.button_sizeBar : barClasses.button_sizeBar)
							: (isLightTheme ? barClassesLight.button_sizeBar_select : barClasses.button_sizeBar_select)) :
						(isLightTheme ? barClassesLight.button_sizeBarNone : barClasses.button_sizeBarNone)}
					onClick={changeButtonColor}>
					<span className={isBigButtonClicked ? (isLightTheme ? barClassesLight.text : barClasses.text)
						: (isLightTheme ? barClassesLight.text_select : barClasses.text_select)}>Маленькая</span>
				</button>
			</div>
			<button
				onClick={modelSetUp}
				className={ isLightTheme ? barClassesLight.loadButton_sizeBar : barClasses.loadButton_sizeBar}>
				<div className={barClassesLight.loadButtonInside}>
					<span className={isLightTheme ? barClassesLight.text : barClasses.text}>Загрузить</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
						<path d="M4 12.2353H10V6.58824H14L7 0L0 6.58824H4V12.2353ZM0 14.1176H14V16H0V14.1176Z" fill={isLightTheme ? '#0066FF' : "white"} />
					</svg>
				</div>

			</button>
		</div>
	);
}
