import React from "react";
import loadClasses from './stylesDark/loadTex.module.css';
import loadClassesLight from './stylesLight/loadTex.module.css';
import { IconButton, Tooltip, InputLabel, Input } from '@mui/material';
import mainClass from './stylesDark/main.module.css'
import mainClassLight from './stylesLight/main.module.css'
import { SelectTexMenu } from "./selectTexMenu";
import { useState, useEffect, useCallback, useMemo } from "react";
import api from '../../api/api'
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";


export const Menu = ({ setCurrenTexture, canvasTextures, isLightTheme, }) => {
	const [textureStorage, setTextureStore] = useState([]);
	const [texCount, setTexCount] = useState(0);
	const [InputKey, setInputKey] = useState(0);

	useEffect(() => {
		const getTexStorage = async () => {
			console.log('сработала')
			await api.GetTextureStorage()
				.then(res => {
					if (res.data) {
						setTextureStore(res.data);
					}
				})
				.catch(err => console.log('Ошибка подключения к хранилищу: ', err));
		};
		getTexStorage();
	}, []);

	useMemo(() => {
		setTextureStore([...textureStorage, ...canvasTextures]); 
		setTexCount(textureStorage.length) }, 
		[canvasTextures]); 

	const Send = useCallback(async (img) => {
		try {
			const data = await api.LoadTexture(img);
			setTextureStore([...textureStorage, data.data]);
			setCurrenTexture(data.data.bytes);
			setTexCount(textureStorage.length);
			return data;
		} catch (e) {
			console.log('error loading texture');
			console.error(e);
			throw e;
		}
	}, [textureStorage])

	const updateTexStorage = async () => {
		 await api.GetTextureStorage()
			.then(newTexes => setTextureStore(newTexes.data))
			.catch(err => {console.log("Ошибка подключения к хранилищу" + err); setTextureStore([]); setCurrenTexture('');});
	}

	async function cleanTexStorage() {
		await api.DeleteAllTextures()
			.then( () => {setTextureStore([]); setCurrenTexture('')})
			.catch(err => console.log('Ошибка очистки хранилища: ', err))
	}

	const handleFileChange = (event) => {
		let files = [...event.target.files];

		let formData = new FormData();
		formData.append(`file`, files[0]);
		formData.append("Content-Type", "multipart/form-data");
		Send(formData);

		setInputKey(InputKey + 1);
	};

	return (
		<>
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
										<IconButton onClick={()=>{cleanTexStorage()}}>
											<DeleteIcon className={isLightTheme ? loadClassesLight.deleteIcon : loadClasses.deleteIcon} />
										</IconButton>
									</Tooltip>
								</div>
							</>

						}
					</div>
					<div className={isLightTheme ? loadClassesLight.selectTexMenu_container : loadClasses.selectTexMenu_container}>
						<SelectTexMenu
							// updateStorage = {updateStorage}
							setTextureStore = {setTextureStore}
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

