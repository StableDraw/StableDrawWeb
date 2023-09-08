import React, { useCallback } from "react";
import { Scene } from './Scene'
import { useMemo, useState, } from "react";
import { Header } from "./header";
import api from '../../api/api'
import { Menu } from "./menu";
import { ToggleBar } from "./toggleBar";
import { Typography, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import mainClass from './stylesDark/main.module.css'
import mainClassLight from './stylesLight/main.module.css'
import sceneClass from './stylesDark/scene.module.css'


export const MainBabylon = () => {
	const [currentScene, setCurrentScene] = useState('');
	const [modelType, setModelType] = useState('TypeABig');
	const [currenTexture, setCurrenTexture] = useState('');
	const [canvasTextures, setCanvasTextures] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [sceneModal, setSceneModal] = useState('')
	const [isLightTheme, setTheme] = useState(false);
	
	const dragStartHandler = (e) => {
		e.preventDefault();
	};

	const dragLeaveHandler = (e) => {
		e.preventDefault();
	}

	const Send = useCallback(async (img) => {
		try {
			const data = await api.LoadTexture(img)
			const texes = data.data.map((id) => "./api/image/" + id)
			setCanvasTextures([...texes])
			setCurrenTexture(texes[0])
			return data
		} catch (e) {
			console.log('error loading texture')
			console.error(e);
			throw e;
		}
	}, [])

	const onDropHandler = (e) => {
		e.preventDefault();
		let filesName = e.dataTransfer.files[0].name.split('.')
		console.log("split:", filesName)
		let files = [...e.dataTransfer.files];
		let formData = new FormData();

		formData.append(`file`, files[0]);
		formData.append("Content-Type", 'multipart/form-data')

		Send(formData)
	}

	const memoizedScene = useMemo(() =>
		<div
			onDragLeave={e => dragLeaveHandler(e)}
			onDrop={e => onDropHandler(e)}
			onDragOver={e => dragStartHandler(e)}
			className={sceneClass.canvas}>
			{sceneModal && <div className={sceneClass.sceneModal}>
				<Typography className={sceneClass.txt}>
					{sceneModal}
				</Typography>
				<IconButton className={sceneClass.cancelBtn}
					onClick={() => { setSceneModal(''); setCurrentScene('') }}>
					<CancelIcon className={sceneClass.cancelBtn} />
				</IconButton>
			</div>
			}
			<Scene
				modelFileName={modelType}
				sceneFileName={currentScene}
				texture={currenTexture} />
		</div>, [currentScene, modelType, currenTexture, isOpen]);

	const changeModel = useCallback((model) => {
		setModelType(model);
	}, [])

	const changeScene = useCallback((scene) => {
		setCurrentScene(scene);
	}, [])

	return (
		<>
			<Header setTheme={setTheme} isLightTheme={isLightTheme} />

			<div style={{ position: 'relative',}}>
				<div className={ isLightTheme ? mainClassLight.main : mainClass.main} >
					<div className={mainClass.sceneBox}>
						<div className={mainClass.scene}>
							{memoizedScene}
						</div>
						<div className={mainClass.loadMenu}>
							<Menu
								setCurrenTexture={setCurrenTexture}
								canvasTextures={canvasTextures}
								isLightTheme={isLightTheme}
							/>
						</div>
					</div>
					<ToggleBar
						isLightTheme = {isLightTheme}
						changeModel={changeModel}
						changeScene={changeScene}
						setIsOpen={setIsOpen}
						isOpen={isOpen}
						setSceneModal={setSceneModal} />
				</div>
			</div>
		</>
	);
};