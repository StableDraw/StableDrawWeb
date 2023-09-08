import React from "react";
import loadClasses from './stylesDark/loadTex.module.css';
import loadClassesLight from './stylesLight/loadTex.module.css';
// import { TexMenuBtn } from "./texMenuBtns";
import { IconButton, Tooltip, InputLabel, Input } from '@mui/material';
import mainClass from './stylesDark/main.module.css'
import mainClassLight from './stylesLight/main.module.css'
import { SelectTexMenu } from "./selectTexMenu";
import { useState, useEffect, useCallback, useMemo } from "react";
import api from '../../api/api'
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";


export const Menu = ({ setCurrenTexture, canvasTextures, isLightTheme }) => {
	const [textureStorage, setTextureStore] = useState([]);
	const [texCount, setTexCount] = useState(0);
	const [InputKey, setInputKey] = useState(0);

	console.log("menu rerender")

	useEffect(() => {
		const getTexStorage = async () => {
			await api.GetTextureStorage()
				.then(res => {
					if (res.data) {
						const links = res.data.map(id => "./api/image/" + id);
						setTextureStore(links);
						// если это включить, то будет лишний перерендер, но за то текстуры будут сразу подрубаться в сцену.
						// setCurrenTexture(links[0]);
					}
				})
				.catch(err => console.log(err));
		};
		getTexStorage();
	}, []);

	useMemo(() => setTextureStore([...canvasTextures]), [canvasTextures])

	// тут проблема, что LoadTexture возвращает весь массив id, когда нужно только добавленный(позволит грамотно отслеживать и подключать к сцене при загрузке: нужен контроллер)
	const Send = useCallback(async (img) => {
		try {
			const data = await api.LoadTexture(img);
			const texes = data.data.map((id) => "./api/image/" + id);
			console.log('Loading tex: ', texes)
			setTextureStore(texes);
			setCurrenTexture(texes[0]);
			return data;
		} catch (e) {
			console.log('error loading texture');
			console.error(e);
			throw e;
		}
	}, [])

	const updateTexStorage = useCallback(async () => {
		await api.GetTextureStorage()
			.then(newTexStore => {
				const links = newTexStore.data.map(id => "./api/image/" + id)
				setTextureStore(links);
			})
			.catch(err => console.log("Ошибка подключения к хранилищу" + err))
	}, [])

	async function cleanTexStorage() {
		await api.GetTextureStorage()
			.then(async (storage) => {
				console.log(storage)
				storage.data.map(async (store) => {
					await api.DeleteTexture(store)
				})
				setCurrenTexture('');
			})
			.catch(err => console.log('Ошибка очистки хранилища'))
		updateTexStorage();
	}

	const handleFileChange = (event) => {
		let files = [...event.target.files];

		console.log("файлы c кнопки:", files[0].name);

		let formData = new FormData();
		formData.append(`file`, files[0]);
		formData.append("Content-Type", "multipart/form-data");
		Send(formData);

		setInputKey(InputKey + 1);
	};

	return (
		<>
			{/* <TexMenuBtn send={Send} isLightTheme={isLightTheme} /> */}
			<div className={mainClass.tex_loadMenu}>
				<div className={loadClasses.cont}>
					<div className={loadClasses.arrowDelete_selectTexMenu}>
						{Boolean(textureStorage.length) &&
							<>
								<div>
									<Tooltip title='Загрузить текстуру'>
										<InputLabel className={isLightTheme ? mainClassLight.inputLabel : mainClass.inputLabel} htmlFor="file-input">
												<AddPhotoAlternateRoundedIcon className={isLightTheme ? loadClassesLight.loadIcon : loadClasses.loadIcon} />
										</InputLabel>
									</Tooltip>
									<Input
										key={InputKey}
										id="file-input"
										type="file"
										hidden
										multiple={true}
										inputProps={{
											accept: "image/*",
											multiple: true,
										}}
										onChange={handleFileChange}
									/>
								</div>
								<div>
									<Tooltip title='Удалить все текстуры' placement="top">
										<IconButton onClick={cleanTexStorage}>
											<DeleteIcon className={isLightTheme ? loadClassesLight.deleteIcon : loadClasses.deleteIcon} />
										</IconButton>
									</Tooltip>
								</div>
							</>

						}
					</div>
					<div className={isLightTheme ? loadClassesLight.selectTexMenu_container : loadClasses.selectTexMenu_container}>
						<SelectTexMenu
							send={Send}
							updateTexStorage={updateTexStorage}
							textureStorage={textureStorage}
							texCount={texCount}
							setTexCount={setTexCount}
							setCurrenTexture={setCurrenTexture}
							isLightTheme={isLightTheme}
						/>
					</div>
					<div className={loadClasses.arrow_selectTexMenu}>
					</div>
				</div>
			</div>

		</>
	);
}

