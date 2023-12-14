import React from "react";
import { Scene } from './Scene'
import { useMemo, useState, useCallback, useEffect, } from "react";
import { Header } from "./header";
import api from '../../api/api';
import { Menu } from "./menu";
import { ToggleBar } from "./toggleBar";
import mainClass from './stylesDark/main.module.css'
import mainClassLight from './stylesLight/main.module.css'
import { DragAndDropLayout } from "./DragAndDropLayout";
import { CloseScene } from "./closeScene";
import { SkeletonCanvas } from "./UI_skeleton/SkeletonCanvas";
import { Link } from "react-router-dom";
import { EnvMenu } from "./envMenu";


export const MainBabylon = () => {
	const [currentSceneUrl, setCurrentSceneUrl] = useState('');
	const [currentModelUrl, setCurrentModelUrl] = useState('');
	const [currenTexture, setCurrenTexture] = useState('');
	const [canvasTextures, setCanvasTextures] = useState([]);
	const [sceneModal, setSceneModal] = useState('');
	const [isLightTheme, setTheme] = useState(false);
	const [envUrlList, setEnvUrlList] = useState([]); //список объектов с картами окружения
	const [envUrl, setEnvUrl] = useState(''); // текущая карта окружения

	useEffect(() => {
		const getEnvUrl = async () => {
			const staticMesh = await api.GetLinksToDownload()
				.catch((err) => {
					console.log('Ошибка при загрузке стартовых данных сцены: ', err);
				});
			const envMap = staticMesh?.data?.envMaps;
			const model = staticMesh?.data?.models[0]?.modelsDict?.big;
			if (envMap && model) {
				if(envMap[0]?.data)
					setEnvUrl(envMap[0].data);

				setEnvUrlList(envMap);
				setCurrentModelUrl(model);
			}
		}
		getEnvUrl();
	}, []);


	const send = useCallback(async (img) => {
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

	const memoizedScene = useMemo(() =>
		<DragAndDropLayout send={send}>
			{sceneModal &&
				<CloseScene
					sceneModal={sceneModal}
					setSceneModal={setSceneModal}
					setScene={setCurrentSceneUrl} />
			}
			{
				envUrl && currentModelUrl ?
					<>
						<EnvMenu setEnvMap={setEnvUrl} envMaps={envUrlList} />
						<Scene
							modelUrl={currentModelUrl}
							sceneUrl={currentSceneUrl}
							texture={currenTexture}
							envUrl={envUrl} />
					</> : <SkeletonCanvas />
			}
		</DragAndDropLayout>, [currentSceneUrl, currentModelUrl, currenTexture, envUrl]);

	const changeModel = useCallback((model) => {
		setCurrentModelUrl(model);
	}, [])

	const changeScene = useCallback((scene) => {
		setCurrentSceneUrl(scene);
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
					setSceneModal={setSceneModal} />
			</div>
			<Menu
				setCurrenTexture={setCurrenTexture}
				canvasTextures={canvasTextures}
				isLightTheme={isLightTheme}
			/>
			<div className={mainClass.Lamb}>
				<Link to='https://lambumiz.ru/' className={isLightTheme ? mainClassLight.Link : mainClass.Link}>
					<span className={isLightTheme ? mainClassLight.textLamb : mainClass.textLamb} >
						Сделано в пратнёрстве с АО Ламбумиз
					</span>
				</Link>
				<img className={isLightTheme ? mainClassLight.lambLogo : mainClass.lambLogo} src="/babylon UI/lambumiz.png" alt="" />
			</div>

		</div>
	);
};