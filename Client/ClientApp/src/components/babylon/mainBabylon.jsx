import React from "react";
import { SceneBar } from "./SceneBar";
import { Scene } from './Scene'
import { Button, AppBar, Box, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { useMemo, useState } from "react";
import { ModelsBar } from "./modelsBar";
import barClasses from './styles/bar.module.css';
import headerClasses from './styles/appBar.module.css';
import { Loader } from "./loader";

const modelFileName = 'PackNonTexBig'; // Эти данные должны приходить с бека
const tex = 'packTexBig2.jpeg';					 // Эти данные должны приходить с бека

export const MainBabylon = () => {
	const [scenesIsVisible, setScenesIsVisible] = useState(false);
	const [currentScene, setCurrentScene] = useState('');
	const [modelsIsVisible, setModelsIsVisible] = useState(false);
	const [modelType, setModelType] = useState('PackBig');

	const memoizedScene = useMemo(() =>
		<Scene
			modelFileName={modelType}
			sceneFileName={currentScene}
			texture={tex} />,
		[currentScene, modelType]);

	const changeModel = (model) => {
		setModelType(model);
	}

	const changeScene = (scene) => {
		setCurrentScene(scene);
	}

	const showSceneBar = () => {
		setModelsIsVisible(false);
		setScenesIsVisible(!scenesIsVisible);
	};

	const showModelsBar = () => {
		setScenesIsVisible(false);
		setModelsIsVisible(!modelsIsVisible);
	}

	return (
		<>
			<AppBar position="static">
				<Toolbar >
					<Box sx={{ flexGrow: 1 }}></Box>
					<div className={headerClasses.buttonContainer}>
						<Button
							color="inherit"
							onClick={showModelsBar}
							endIcon={<ViewInArOutlinedIcon />}>
							Select model
						</Button>
						<Button
							color="inherit"
							onClick={showSceneBar}
							endIcon={<AspectRatioIcon />}>
							Select scene
						</Button>
					</div>
				</Toolbar>
			</AppBar>

			<div className={barClasses.barContainer}>
				{modelsIsVisible &&
					<ModelsBar
						changeModel={changeModel}
						toggleModelBar={showModelsBar} />
				}

				{scenesIsVisible &&
					<SceneBar
						toggleSceneBar={showSceneBar}
						changeScene={changeScene} />
				}
			</div>

			{memoizedScene}
			
			<div style={{display:'flex', justifyContent:'center', padding:'10px'}}>
				<Loader/>
			</div>
			{/*<Button*/}
			{/*	variant="outlined"*/}
			{/*	endIcon={<SendIcon />}>*/}
			{/*	Send to render*/}
			{/*</Button>*/}
		</>
	);
};