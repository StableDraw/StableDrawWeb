import React from "react";
import loadClasses from './stylesDark/loadTex.module.css';
import loadClassesLight from './stylesLight/loadTex.module.css';
import { TexMenuBtn } from "./texMenuBtns";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography, Grid, ButtonGroup, Card, IconButton, Tooltip } from '@mui/material';
import mainClass from './stylesDark/main.module.css'
import mainClassLight from './stylesLight/main.module.css'
import { SelectTexMenu } from "./selectTexMenu";
import { useState, useEffect, useCallback, useMemo } from "react";
import api from '../../api/api'
import DeleteIcon from '@mui/icons-material/Delete';


export const Menu = ({ setCurrenTexture, canvasTextures, isLightTheme }) => {
	const [textureStorage, setTextureStore] = useState([]);
	const [texCount, setTexCount] = useState(0);

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

	// тут проблема, что LoadTexture возвращает весь массив id, когда нужно только добавленный(позволит грамотно отслеживать и подключать к сцене при загрузке)
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

	return (
		<>
			<TexMenuBtn send={Send} isLightTheme={isLightTheme} />
			<div className={mainClass.tex_loadMenu}>
				<div className={loadClasses.cont}>
					<div className={loadClasses.arrowDelete_selectTexMenu}>
						{Boolean(textureStorage.length) && 
						<div>
							<Tooltip title='Delete all textures' placement="left">
								<IconButton onClick={cleanTexStorage}>
									<DeleteIcon className={isLightTheme ? loadClassesLight.deleteIcon : loadClasses.deleteIcon} />
								</IconButton>
							</Tooltip>
						</div>
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

