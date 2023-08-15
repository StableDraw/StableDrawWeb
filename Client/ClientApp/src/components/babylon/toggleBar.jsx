import React from 'react';
import { useMemo, useState, useEffect, memo } from "react";
import mainClass from './styles/main.module.css'
import { Button, Typography, ButtonGroup, } from '@mui/material';
import { ModelsBar } from "./modelsBar";
import { SceneBar } from "./SceneBar";

export const ToggleBar = memo(({changeModel, changeScene}) => {
	const [isModelsBar, setModelsBar] = useState(true);

	const showModelsBar = () => {
		setModelsBar(!isModelsBar)
	}
	return (
		<div className={mainClass.bar}>
			<div className={mainClass.selectButtons}>
				<ButtonGroup>
					<Button variant={isModelsBar ? 'contained' : 'outlined'} onClick={showModelsBar}>
						<Typography>
							Select model
						</Typography>
					</Button>
					<Button variant={isModelsBar ? 'outlined' : 'contained'} onClick={showModelsBar}>
						<Typography>
							Select scene
						</Typography>
					</Button>
				</ButtonGroup>
			</div>
			<div className={mainClass.modelsBox}>
				{isModelsBar ? <ModelsBar changeModel={changeModel} /> : <SceneBar changeScene={changeScene} />}
			</div>
		</div>
	);
})