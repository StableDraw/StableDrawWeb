import React from 'react';
import barClasses from './stylesDark/bar.module.css'
import barClassesLight from './stylesLight/bar.module.css'
import modelCardLight from './stylesLight/sizeBar.module.css'
import modelCard from './stylesDark/sizeBar.module.css'
import { SizeBar } from './sizeBar';

export const ModelsCard = ({ type, model, img, changeModel, isLightTheme }) => {

	return (
		<div className={isLightTheme ? modelCardLight.modelCard : modelCard.modelCard}>
			<div className={isLightTheme ? modelCardLight.dark : modelCard.dark}></div>
			<SizeBar changeModel={changeModel} model={model} isLightTheme={isLightTheme} />
			<div className={barClassesLight.imgCard}>
				<img
					className={barClassesLight.imgInside}
					src={img}
					alt={type}
				/>
				<div className={barClassesLight.textCard}>
					<span className={isLightTheme ? barClassesLight.text : barClasses.text}>
						{type}
					</span>
				</div>
			</div>
		</div>
	)
};