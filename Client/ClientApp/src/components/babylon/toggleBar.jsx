import React from 'react';
import { useState, memo } from "react";
import mainClass from './stylesDark/main.module.css'
import mainClassLight from './stylesLight/main.module.css'
import { Button, Typography, ButtonGroup, IconButton} from '@mui/material';
import { ModelsBar } from "./modelsBar";
import { SceneBar } from "./SceneBar";
import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';
import { themeDark, themeLight } from './customThemes';

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
			<div className={mainClass.barButton}>
				<IconButton onClick={() => setIsOpen(!isOpen)}>
					<ViewSidebarRoundedIcon className={isLightTheme ? mainClassLight.barBtn : mainClass.barBtn} />
				</IconButton>
			</div>
			<div className={isOpen ? mainClass.selectButtons.open : mainClass.selectButtons}>
				<ButtonGroup >
					<Button theme = { isLightTheme ? themeLight : themeDark}
						className={isLightTheme ? mainClassLight.buttonGroup : mainClass.buttonGroup}
						variant={isModelsBar ? 'contained' : 'outlined'} onClick={showModelsBar}>
						<Typography className={mainClass.text}>
							Выбрать модель
						</Typography>
					</Button>
					<Button theme = { isLightTheme ? themeLight : themeDark}
						className={isLightTheme ? mainClassLight.buttonGroup : mainClass.buttonGroup}
						variant={isModelsBar ? 'outlined' : 'contained'} onClick={showModelsBar}>
						<Typography className={mainClass.text}>
							Выбрать сцену
						</Typography>
					</Button>
				</ButtonGroup>
			</div>
			<div className={isOpen ? mainClass.modelsBox.open : mainClass.modelsBox}>
				{isModelsBar ? <ModelsBar changeModel={changeModel} isLightTheme={isLightTheme} /> :
					<SceneBar changeScene={changeScene} setSceneModal={setSceneModal} isLightTheme={isLightTheme} />}
			</div>
		</div>
	);
})