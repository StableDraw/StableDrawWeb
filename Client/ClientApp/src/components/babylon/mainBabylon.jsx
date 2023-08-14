import React from "react";
import { SceneBar } from "./SceneBar";
import { Scene } from './Scene'
import { useMemo, useState, useEffect } from "react";
import { ModelsBar } from "./modelsBar";
import barClasses from './styles/bar.module.css';
import { Header } from "./header";
import api from '../../api/api'
import { Button, Typography, Grid, ButtonGroup, Card, IconButton, Input, InputLabel, FormControl } from '@mui/material';
import mainClass from './styles/main.module.css'
import sceneClass from './styles/scene.module.css'
import { Menu } from "./menu";


// Выбор моделей/сцен: либо модалка, либо закос под ютуб | done
// Переверстать страницу под grid | done
// Доделать кнопку clean storage | done
// Стилизовать скролл бары | done
// Кнопка для отрытия проводника и загрузки текстур | done
// Импорт текстур переносом на canvas | done, but not ideal solution
// Новый sizeBar | done
// Ограничить размеры меню с текстурами, добавить скролл | done


// Сделать сдвиг скролла при переключении текстур в меню
// Внедрить новую сцену и модели
// Пофиксить баги с вёрсткой(расширение грида)
// Максимально оптимизировать компоненты(мемоизация)
// Иногда после загрузки текстур с кнопки они подгружаются только в меню(в сцену - нет)
// загрузка нескольких текстур
// Решить вопросы с контроллером
// Тёмная тема основная
// Сделать так, чтобы при перерендере сцены, положение модельки сохранялось
// Возможность открыть canvas в большем экране
// карта окружения лагает(возможно решится после оптимизации)
// Адаптивная вёрстка


export const MainBabylon = () => {
	const [currentScene, setCurrentScene] = useState('');
	const [modelType, setModelType] = useState('TypeABig');
	const [texCount, setTexCount] = useState(0);
	const [currenTexture, setCurrenTexture] = useState([])
	const [isModelsBar, setModelsBar] = useState(true);
	const [drag, setDrag] = useState(false);
	// const [storage, setStorage] = useState([]);

	const [textureStorage, setTextureStore] = useState([]);

	useEffect(() => {
		const getTexStorage = async () => {
			await api.GetTextureStorage()
				.then(res => {
					const id = res.data
					setTextureStore(id)
				})
				.catch(err => console.log(err))
		};
		getTexStorage();
	}, []);


	console.log(currenTexture)

	// const getStorage = (storage) => {
	// 	setStorage(storage)
	// }

	const uploadTexture = (el) => {
		setCurrenTexture([...el]);
	}

	const dragStartHandler = (e) => {
		e.preventDefault();
		setDrag(true)
	};

	const dragLeaveHandler = (e) => {
		e.preventDefault();
		setDrag(false);
	}


	async function Send(img) {
		try {
			const data = await api.LoadTexture(img)
			const texes = data.data.map((el) => "https://localhost:44404/api/image/" + el)
			setCurrenTexture([...texes])
			return data
		} catch (e) {
			console.error(e);
			throw e;
		}
	}

	const onDropHandler = (e) => {
		e.preventDefault();
		let filesName = e.dataTransfer.files[0].name.split('.')
		console.log("split:", filesName)
		if (!textureStorage.includes(filesName[0])) {
			let files = [...e.dataTransfer.files];
			console.log("Хранилище:", textureStorage);
			let formData = new FormData();

			formData.append(`file`, files[0]);
			formData.append("Content-Type", 'multipart/form-data')

			Send(formData)
			setDrag(false);
		}
	}

	const memoizedScene = useMemo(() =>
		<div
			onDragLeave={e => dragLeaveHandler(e)}
			onDrop={e => onDropHandler(e)}
			onDragOver={e => dragStartHandler(e)}
			className={sceneClass.canvas}>
			{
				drag &&
				// Не работает :(
				<div
					// onDragLeave={e => dragLeaveHandler(e)}
					// onDrop={e => onDropHandler(e)}
					// onDragOver={e => dragStartHandler(e)}
					className={sceneClass.loadTexModal}>
					<Typography fontSize={25}>
						Отпустите текстуру для загрузки
					</Typography>
				</div>
			}
			<Scene
				modelFileName={modelType}
				sceneFileName={currentScene}
				texture={currenTexture[texCount]}
				call={uploadTexture} />
		</div>, [currentScene, modelType, texCount, currenTexture]);

	const changeModel = (model) => {
		setModelType(model);
	}

	const changeScene = (scene) => {
		setCurrentScene(scene);
	}

	const showModelsBar = () => {
		setModelsBar(!isModelsBar)
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
							<Menu
								setCurrenTexture={setCurrenTexture}
								currenTexture={currenTexture}
								texCount={texCount}
								setTexCount={setTexCount}
								send={Send}
							/>
						</div>
					</div>
					<div className={mainClass.bar}>
						<div className={mainClass.selectButtons}>
							<ButtonGroup>
								<Button variant={isModelsBar ? 'contained' : 'outlined'} onClick={showModelsBar}>
									<Typography>
										Select model
									</Typography>
								</Button>
								<Button variant={isModelsBar ? 'outlined' : 'contained'} onClick={showModelsBar}>
									<Typography>
										Select scene
									</Typography>
								</Button>
							</ButtonGroup>
						</div>
						<div className={mainClass.modelsBox}>
							{isModelsBar ? <ModelsBar changeModel={changeModel} /> : <SceneBar changeScene={changeScene} />}
						</div>
					</div>
				</div>
			</div>


		</>
	);
};