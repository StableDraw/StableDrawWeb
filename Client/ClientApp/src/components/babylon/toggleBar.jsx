import React from 'react';
import { useState, memo, useEffect } from "react";
import mainClass from './stylesLight/main.module.css'
import { ModelsBar } from "./modelsBar";
import { SceneBar } from "./SceneBar";
import api from '../../api/api';
import toggleStylesLight from './stylesLight/toggleBtn.module.css'
import toggleStylesDark from './stylesDark/toggleBtn.module.css'

export const ToggleBar = memo(({
	changeModel,
	changeScene,
	setSceneModal,
	isLightTheme }) => {
	const [isModelsBar, setModelsBar] = useState(true);
	const [modelStaff, setModelStaff] = useState();


	useEffect(() => {
		const getLinksToAllStatics = async () => {
			const staticMesh = await api.GetLinksToDownload()
				.catch((err) => { console.log("Ошибка при получении данных с сервера: ", err) });
				// console.log(staticMesh);
			setModelStaff(staticMesh);
		}
		getLinksToAllStatics();
	}, []);

	const showModelsBar = () => {
		setModelsBar(!isModelsBar)
	}

	return (
		<div className={mainClass.bar}>
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
			{isModelsBar ? <ModelsBar modelStaff={modelStaff} changeModel={changeModel} isLightTheme={isLightTheme} /> :
				<SceneBar modelStaff={modelStaff} changeScene={changeScene} setSceneModal={setSceneModal} isLightTheme={isLightTheme} />}
		</div>
	);
})