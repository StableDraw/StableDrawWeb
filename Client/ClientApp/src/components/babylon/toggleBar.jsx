import React from 'react';
import { useState, memo } from "react";
import mainClass from './stylesLight/main.module.css'
import mainClassLight from './stylesLight/main.module.css'
import { ModelsBar } from "./modelsBar";
import { SceneBar } from "./SceneBar";
import toggleStylesLight from './stylesLight/toggleBtn.module.css'
import toggleStylesDark from './stylesDark/toggleBtn.module.css'

export const ToggleBar = memo(({
	changeModel,
	changeScene,
	isOpen,
	setIsOpen,
	setSceneModal,
	isLightTheme }) => {
	const [isModelsBar, setModelsBar] = useState(true);

	const showModelsBar = () => {
		setModelsBar(!isModelsBar)
	}
	return (
		<div className={mainClass.bar}>
			{/* <div className={mainClass.barButton}>
				<IconButton onClick={() => setIsOpen(!isOpen)}>
					<ViewSidebarRoundedIcon className={isLightTheme ? mainClassLight.barBtn : mainClass.barBtn} />
				</IconButton>
			</div> */}
			<div className={toggleStylesLight.selectButtons}>
				<button
					onClick={showModelsBar}
					className={isModelsBar ? (isLightTheme ? toggleStylesLight.selectButton1_select : toggleStylesDark.selectButton1_select)
						: (isLightTheme ? toggleStylesLight.selectButton1 : toggleStylesDark.selectButton1)}>

					<span className={isModelsBar ? (isLightTheme ? toggleStylesLight.selectTxt_select : toggleStylesDark.selectTxt_select)
						: (isLightTheme ? toggleStylesLight.selectTxt : toggleStylesDark.selectTxt)}>
						Модель
					</span>

				</button>
				<button
					onClick={showModelsBar}
					className={isModelsBar ? (isLightTheme ? toggleStylesLight.selectButton2 : toggleStylesDark.selectButton2)
						: (isLightTheme ? toggleStylesLight.selectButton2_select : toggleStylesDark.selectButton2_select)}>

					<span className={isModelsBar ? (isLightTheme ? toggleStylesLight.selectTxt : toggleStylesDark.selectTxt)
						: (isLightTheme ? toggleStylesLight.selectTxt_select : toggleStylesDark.selectTxt_select)}>
						Сцена
					</span>

				</button>
			</div>
			{isModelsBar ? <ModelsBar changeModel={changeModel} isLightTheme={isLightTheme} /> :
				<SceneBar changeScene={changeScene} setSceneModal={setSceneModal} isLightTheme={isLightTheme} />}
		</div>
	);
})