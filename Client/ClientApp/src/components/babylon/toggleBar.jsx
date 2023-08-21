import React from 'react';
import { useMemo, useState, useEffect, memo } from "react";
import mainClass from './stylesDark/main.module.css'
import mainClassLight from './stylesLight/main.module.css'
import { Button, Typography, ButtonGroup, IconButton } from '@mui/material';
import { ModelsBar } from "./modelsBar";
import { SceneBar } from "./SceneBar";
import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';

export const ToggleBar = memo(({ changeModel, changeScene, isOpen, setIsOpen, setSceneModal, isLightTheme }) => {
	const [isModelsBar, setModelsBar] = useState(true);

	const showModelsBar = () => {
		setModelsBar(!isModelsBar)
	}
	return (
		<div className={mainClass.bar}>
			<div className={mainClass.barButton}>
				<IconButton onClick={() => setIsOpen(!isOpen)}>
					<ViewSidebarRoundedIcon className={ isLightTheme ? mainClassLight.barBtn : mainClass.barBtn} />
				</IconButton>
			</div>
			<div className={isOpen ? mainClass.selectButtons.open : mainClass.selectButtons}>
				{/* <div className={mainClass.barButton}>
					<IconButton onClick={() => setIsOpen(false)}>
						<ViewSidebarRoundedIcon />
					</IconButton>
				</div> */}
				<ButtonGroup className={mainClass.buttonGroup}>
					<Button className={mainClass.buttonGroup} variant={isModelsBar ? 'contained' : 'outlined'} onClick={showModelsBar}>
						<Typography className={mainClass.text}>
							Select model
						</Typography>
					</Button>
					<Button variant={isModelsBar ? 'outlined' : 'contained'} onClick={showModelsBar}>
						<Typography className={mainClass.text}>
							Select scene
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