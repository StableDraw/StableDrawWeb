import React from "react";
import { SceneBar } from "./SceneBar";
import { Scene } from './Scene'
import { Button, AppBar, Box, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { useMemo, useState } from "react";
import { SizeBar } from "./sizeBar";
import { ModelsBar } from "./modelsBar";

const modelFileName = 'PackNonTexBig'; // Эти данные должны приходить с бека
const tex = 'packTexBig2.jpeg';					 // Эти данные должны приходить с бека

export const MainBabylon = () => {
	const [scenesIsVisible, setScenesIsVisible] = useState(false);
	const [currentScene, setCurrentScene] = useState('');
	const [modelsIsVisible, setModelsIsVisible] = useState(false);
	const [modelType, setModelType] = useState('');
	const memoizedScene = useMemo(() =>
		<Scene
			modelFileName={modelFileName}
			sceneFileName={currentScene}
			texture={tex} />,
		[currentScene]);

		const changeModel = (model) =>{
			setModelType(model);
		}

	//Пока не придумал, как реализовать адекватный обмен свойствами между компонентами,
	//поэтому эта функция реализует передачу сцены в этот компонент из дочернего компонента SceneCard
	const changeScene = (scene) => {
		setCurrentScene(scene);
	}

	// Пока что эта функция передаётся в SceneCard стандартно, но 
	// в данном случае для этого лучше использовать композицию компонентов или context,
	// разбираюсь с ними...
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
					<div style={{ display: 'flex', gap: " 20px" }}>
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
			<div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end', gap:'10px'}}>
				{modelsIsVisible && <ModelsBar changeModel={changeModel}/>}
				
				{scenesIsVisible &&
				<SceneBar
					toggleSceneBar={showSceneBar}
					changeScene={changeScene} />
			}
			
			</div>

			

			{memoizedScene}

			<Button
				variant="outlined"
				endIcon={<SendIcon />}>
				Send to render
			</Button>
		</>
	);
};