import React from "react";
import { SceneBar } from "./SceneBar";
import { Scene } from './Scene'
import { Button, AppBar, Box, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import { useMemo, useState } from "react";

const modelFileName = 'PackNonTexSmall'; // Эти данные должны приходить с бека
const tex = 'packTexBig2.jpeg';					 // Эти данные должны приходить с бека

export const MainBabylon = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [currentScene, setCurrentScene] = useState('');
	const memoizedScene = useMemo(() =>
		<Scene
			modelFileName={modelFileName}
			sceneFileName={currentScene}
			texture={tex} />,
		[currentScene]);

	//Пока не придумал, как реализовать адекватный обмен свойствами между компонентами,
	//поэтому эта функция реализует передачу сцены в этот компонент из дочернего компонента SceneCard
	const changeScene = (scene) => {
		setCurrentScene(scene);
	}

	// Пока что эта функция передаётся в SceneCard стандартно, но 
	// в данном случае для этого лучше использовать композицию компонентов или context,
	// разбираюсь с ними...
	const showSceneBar = () => {
		setIsVisible(!isVisible);
	};

	return (
		<>
			<AppBar position="static">
				<Toolbar >
					<Box sx={{ flexGrow: 1 }}></Box>
					<Button
						color="inherit"
						onClick={showSceneBar}
						endIcon={<MenuIcon />}>
						Select scene
					</Button>
				</Toolbar>
			</AppBar>

			{isVisible &&
				<SceneBar
					toggleSceneBar={showSceneBar}
					changeScene={changeScene} />
			}

			{memoizedScene}

			<Button
				variant="outlined"
				endIcon={<SendIcon />}>
				Send to render
			</Button>
		</>
	);
};