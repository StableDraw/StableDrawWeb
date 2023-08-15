import React, { useCallback } from "react";
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
import { ToggleBar } from "./toggleBar";


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

	const dragStartHandler = (e) => {
		e.preventDefault();
	};

	const dragLeaveHandler = (e) => {
		e.preventDefault();
	}

	const Send = useCallback(async (img) => {
		try {
			const data = await api.LoadTexture(img)
			const texes = data.data.map((el) => "https://localhost:44404/api/image/" + el)
			setCurrenTexture([...texes])
			return data
		} catch (e) {
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
			<Scene
				modelFileName={modelType}
				sceneFileName={currentScene}
				texture={currenTexture[texCount]} />
		</div>, [currentScene, modelType, texCount, currenTexture]);

	const changeModel = useCallback((model) => {
		setModelType(model);
	}, [])

	const changeScene = useCallback((scene) => {
		setCurrentScene(scene);
	}, [])

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
					<ToggleBar changeModel={changeModel} changeScene={changeScene}/>
				</div>
			</div>
		</>
	);
};