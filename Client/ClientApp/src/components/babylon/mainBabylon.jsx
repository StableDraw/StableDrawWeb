import React from "react";
import { SceneBar } from "./SceneBar";
import { Scene } from './Scene'
import { Button} from '@mui/material';
import { useMemo, useState, useEffect } from "react";
import { ModelsBar } from "./modelsBar";
import barClasses from './styles/bar.module.css';
import { Loader } from "./loader";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton } from '@mui/material';
import { Header } from "./header";
import CloseIcon from '@mui/icons-material/Close';
import api from '../../api/api'


export const MainBabylon = () => {
	const [scenesIsVisible, setScenesIsVisible] = useState(false);
	const [currentScene, setCurrentScene] = useState('');
	const [modelsIsVisible, setModelsIsVisible] = useState(false);
	const [modelType, setModelType] = useState('TypeABig');
	const [texCount, setTexCount] = useState(0);
	
	const [currenTexture, setCurrenTexture] = useState([])
	
	// console.log(currenTexture);	
	const memoizedScene = useMemo(() =>
		<Scene
			modelFileName={modelType}
			sceneFileName={currentScene}
			texture={currenTexture[texCount]} />,
		[currentScene, modelType, texCount, currenTexture]);


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
	
	const uploadTexture = (el) => {
		setCurrenTexture([...el]);
	}
	
	const changeTextureUp = () => {
		if (texCount === currenTexture.length - 1)
			return
		setTexCount(texCount + 1)
	};

	const changeTextureDown = () => {
		if (texCount === 0)
			return;
		setTexCount(texCount - 1)
	};


	async function deleteTex(id) { 
		const data = await api.DeleteFile(id.toString())
		setCurrenTexture()
		console.log(data)
	}

	return (
		<>
			<Header
				showModelsBar={showModelsBar}
				showSceneBar={showSceneBar} />

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
			
			<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', padding:'5px' }}>

					{currenTexture.length > 0 && <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
						
						
					<IconButton onClick={changeTextureDown}>
						<KeyboardArrowLeftIcon />
					</IconButton>
					<div>
						{currenTexture.map((tex, index) => 
						<Button onClick={()=>setTexCount(index)}>
							<div>
								<div style={{display:'flex', alignItems:'flex-start'}}>
							<IconButton onClick={()=>{deleteTex(tex)}}>
						<CloseIcon/>
					</IconButton>
					<img src={tex}
								alt="texture" 
								style={{ height: '100px', width: 'auto', border:index === texCount ? '3px solid #1976d2': 'none', borderRadius: '10px' }}
								key={tex}/>
						</div>
							</div>
							
						</Button>
						)}
						<div>
							
						</div>
					</div>
					<IconButton onClick={changeTextureUp}>
						<KeyboardArrowRightIcon />
					</IconButton>
					
				</div>}

				
				<div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
					<Loader call={uploadTexture}/>
				</div>
			</div>
		</>
	);
};