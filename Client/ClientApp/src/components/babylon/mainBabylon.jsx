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
import { Button, Typography, Grid, ButtonGroup } from '@mui/material';
import mainClass from './styles/main.module.css'



// Выбор моделей/сцен: либо модалка, либо закос под ютуб
// Доделать кнопку clean storage
// Стилизовать скролл бары
// внедрить useReducer
// Кнопка для отрытия проводника и загрузки текстур
// Импорт текстур переносом на canvas
// Решить вопросы с контроллером
// Тёмная тема основная
// Сделать так, чтобы при перерендере сцены, положение модельки сохранялось
// Возможность открыть canvas в большем экране
// Ограничить размеры меню с текстурами
// карта окружения лагает


export const MainBabylon = () => {
	const [currentScene, setCurrentScene] = useState('');
	const [modelType, setModelType] = useState('TypeABig');
	const [texCount, setTexCount] = useState(0);
	const [currenTexture, setCurrenTexture] = useState([])
	const [textureStorage, setTextureStore] = useState([]);
	const [isModelsBar, setModelsBar] = useState(false);
	const [isSceneBar, setIsSceneBar] = useState(false);

	useEffect(() => {
		const getTexStorage = async () => {
			await api.GetTextureStorage()
				.then(res => {
					const links = res.data.map(id => "https://localhost:44404/api/image/" + id);
					setCurrenTexture(links)
				})
				.catch(err => console.log(err))
		};
		getTexStorage();
	}, [textureStorage]);
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

	const showSceneBar = () =>{
		setIsSceneBar();
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

	const updateTexStorage = async () => {
		await api.GetTextureStorage()
			.then(newTexStore => { setTextureStore(newTexStore.data); })
			.catch(err => console.log("Ошибка подключения к хранилищу" + err))
	}

	async function deleteTex(link) {
		await api.DeleteTexture(link.toString())
		updateTexStorage();
	}

	async function cleanTexStorage() {
		await api.GetTextureStorage()
			.then(async (storage) => {
				console.log(storage)
				storage.data.map(async (store) => {
					await api.DeleteTexture(store)
				})
			})
			.catch(err => console.log('Ошибка очистки хранилища'))
		updateTexStorage();
	}


	return (
		<>
			<Header />

				<div>
					<div className={mainClass.main} >
				<div className={mainClass.sceneBox}>
					<div className={mainClass.scene}>
						{memoizedScene}
					</div>
					<div className={mainClass.loadMenu}>
						{
							currenTexture.length > 0 &&
							<SelectTexMenu
								cleanStorage={cleanTexStorage}
								currenTexture={currenTexture}
								changeTextureDown={changeTextureDown}
								changeTextureUp={changeTextureUp}
								texCount={texCount}
								setTexCount={setTexCount}
								deleteTex={deleteTex}
							/>
						}
						<Loader call={uploadTexture} />
					</div>
				</div>
				<div className={mainClass.bar}>
					<div className={mainClass.selectButtons}>
						<ButtonGroup>
						<Button variant="outlined">
							<Typography>
								Select model
							</Typography>
						</Button>
						<Button variant="outlined">
							<Typography>
								Select scene
							</Typography>
						</Button>
					</ButtonGroup>
					</div>
					<div className={mainClass.modelsBox}>
						{}
						<ModelsBar
						changeModel={changeModel}
						 />
						<SceneBar changeScene={changeScene}/>
					</div>
				</div>
			</div>
				</div>

			
		</>
	);
};