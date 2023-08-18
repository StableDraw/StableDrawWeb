import React, { useCallback } from "react";
import { Scene } from './Scene'
import { useMemo, useState, useEffect } from "react";
import { Header } from "./header";
import api from '../../api/api'
import mainClass from './stylesLight/main.module.css'
import sceneClass from './stylesLight/scene.module.css'
import { Menu } from "./menu";
import { ToggleBar } from "./toggleBar";
import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';
import { Button, Typography, ButtonGroup, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';



export const MainBabylon = () => {
	const [currentScene, setCurrentScene] = useState('');
	const [modelType, setModelType] = useState('TypeABig');
	const [currenTexture, setCurrenTexture] = useState('');
	const [canvasTextures, setCanvasTextures] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [sceneModal, setSceneModal] = useState('')

	const dragStartHandler = (e) => {
		e.preventDefault();
	};

	const dragLeaveHandler = (e) => {
		e.preventDefault();
	}

	const Send = useCallback(async (img) => {
		try {
			const data = await api.LoadTexture(img)
			const texes = data.data.map((id) => "https://localhost:44404/api/image/" + id)
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

		// if (!textureStorage.includes(filesName[0])) {

		// }
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
			<Header />

			<div style={{ position: 'relative' }}>
				<div className={mainClass.main} >
					{/* {
							!isOpen && <div className={mainClass.SceneBarButton}>
							<IconButton onClick={() => setIsOpen(true)}>
								<ViewSidebarRoundedIcon />
							</IconButton>
						</div>
						} */}
					<div className={mainClass.sceneBox}>
						<div className={mainClass.scene}>
							{memoizedScene}
						</div>
						<div className={mainClass.loadMenu}>
							<Menu
								setCurrenTexture={setCurrenTexture}
								canvasTextures={canvasTextures}
							/>
						</div>
					</div>
					<ToggleBar
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