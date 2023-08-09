import React from "react";
import { SceneBar } from "./SceneBar";
import { Scene } from './Scene'
import { useMemo, useState, useEffect } from "react";
import { ModelsBar } from "./modelsBar";
import barClasses from './styles/bar.module.css';
import { Loader } from "./loader";
import { Header } from "./header";
import api from '../../api/api'
import { SelectTexMenu } from "./selectTexMenu";


export const MainBabylon = () => {
	const [scenesIsVisible, setScenesIsVisible] = useState(false);
	const [currentScene, setCurrentScene] = useState('');
	const [modelsIsVisible, setModelsIsVisible] = useState(false);
	const [modelType, setModelType] = useState('TypeABig');
	const [texCount, setTexCount] = useState(0);
	const [currenTexture, setCurrenTexture] = useState([])
	const [textureStore, setTextureStore] = useState([]);

	useEffect(() => {
		const getTexStore = async () => {
			await api.GetTextureStore()
				.then(res => {
					const links = res.data.map(id => "https://localhost:44404/api/image/" + id);
					setCurrenTexture(links)
				})
				.catch(err => console.log(err))
		};
		getTexStore();
	}, [textureStore]);
	// console.log("store>>", textureStore)
	// console.log("current>>", currenTexture)
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
	}

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


	async function deleteTex(link) {
		await api.DeleteTexture(link.toString())
		await api.GetTextureStore()
			.then(newTexStore => { setTextureStore(newTexStore.data); })
			.catch(err => console.log(err))
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

			<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', padding: '5px' }}>

				{
					currenTexture.length > 0 &&
					<SelectTexMenu
						currenTexture={currenTexture}
						changeTextureDown={changeTextureDown}
						changeTextureUp={changeTextureUp}
						texCount={texCount}
						setTexCount={setTexCount}
						deleteTex={deleteTex}
					/>
				}

				<div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
					<Loader call={uploadTexture} />
				</div>
			</div>
		</>
	);
};