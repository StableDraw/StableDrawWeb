import React, { useCallback } from "react";
import { Scene } from './Scene'
import { useMemo, useState, } from "react";
import { Header } from "./header";
import api from '../../api/api'
import { Menu } from "./menu";
import { ToggleBar } from "./toggleBar";
import mainClass from './stylesDark/main.module.css'
import mainClassLight from './stylesLight/main.module.css'
import sceneClass from './stylesLight/scene.module.css'

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
			const data = await api.LoadTexture(img);
			setCanvasTextures([...canvasTextures, data.data]);
			setCurrenTexture(data.data.bytes);
			return data;
		} catch (e) {
			console.log('error loading texture');
			console.error(e);
			throw e;
		}
	}, [])

	const onDropHandler = (e) => {
		e.preventDefault();
		let files = [...e.dataTransfer.files];
		let formData = new FormData();

		formData.append(`file`, files[0]);
		formData.append("Content-Type", 'multipart/form-data')

		Send(formData)
	}

	const memoizedScene = useMemo(() =>
		//Вынести в отдельный компонент нада
		<div className={sceneClass.canvasOut}
			onDragLeave={e => dragLeaveHandler(e)}
			onDrop={e => onDropHandler(e)}
			onDragOver={e => dragStartHandler(e)}>
			{sceneModal &&
				<div className={sceneClass.sceneModal}>
					<span className={sceneClass.txt}>
						{sceneModal}
					</span>
					<button className={sceneClass.cancelBtn}
						onClick={() => { setSceneModal(''); setCurrentScene('') }}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M13.4099 12L19.7099 5.71C19.8982 5.5217 20.004 5.2663 20.004 5C20.004 4.7337 19.8982 4.47831 19.7099 4.29C19.5216 4.1017 19.2662 3.99591 18.9999 3.99591C18.7336 3.99591 18.4782 4.1017 18.2899 4.29L11.9999 10.59L5.70994 4.29C5.52164 4.1017 5.26624 3.99591 4.99994 3.99591C4.73364 3.99591 4.47824 4.1017 4.28994 4.29C4.10164 4.47831 3.99585 4.7337 3.99585 5C3.99585 5.2663 4.10164 5.5217 4.28994 5.71L10.5899 12L4.28994 18.29C4.19621 18.383 4.12182 18.4936 4.07105 18.6154C4.02028 18.7373 3.99414 18.868 3.99414 19C3.99414 19.132 4.02028 19.2627 4.07105 19.3846C4.12182 19.5064 4.19621 19.617 4.28994 19.71C4.3829 19.8037 4.4935 19.8781 4.61536 19.9289C4.73722 19.9797 4.86793 20.0058 4.99994 20.0058C5.13195 20.0058 5.26266 19.9797 5.38452 19.9289C5.50638 19.8781 5.61698 19.8037 5.70994 19.71L11.9999 13.41L18.2899 19.71C18.3829 19.8037 18.4935 19.8781 18.6154 19.9289C18.7372 19.9797 18.8679 20.0058 18.9999 20.0058C19.132 20.0058 19.2627 19.9797 19.3845 19.9289C19.5064 19.8781 19.617 19.8037 19.7099 19.71C19.8037 19.617 19.8781 19.5064 19.9288 19.3846C19.9796 19.2627 20.0057 19.132 20.0057 19C20.0057 18.868 19.9796 18.7373 19.9288 18.6154C19.8781 18.4936 19.8037 18.383 19.7099 18.29L13.4099 12Z" fill="#ABABAB" />
						</svg>
					</button>
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
		<div className={isLightTheme ? mainClassLight.main : mainClass.main}>
			<Header setTheme={setTheme} isLightTheme={isLightTheme} />

			<div className={isLightTheme ? mainClassLight.content : mainClass.content}>

				{memoizedScene}

				<ToggleBar
					isLightTheme={isLightTheme}
					changeModel={changeModel}
					changeScene={changeScene}
					setIsOpen={setIsOpen}
					isOpen={isOpen}
					setSceneModal={setSceneModal} />
			</div>
			<Menu
				setCurrenTexture={setCurrenTexture}
				canvasTextures={canvasTextures}
				isLightTheme={isLightTheme}
			/>
		</div>
	);
};