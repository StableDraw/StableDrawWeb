import React from "react";
import loadClasses from './styles/loadTex.module.css';
import { TexMenuBtn } from "./texMenuBtns";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography, Grid, ButtonGroup, Card, IconButton, Tooltip } from '@mui/material';
import mainClass from './styles/main.module.css'
import { SelectTexMenu } from "./selectTexMenu";
import { useState, useEffect, useCallback } from "react";
import api from '../../api/api'
import DeleteIcon from '@mui/icons-material/Delete';


export const Menu = ({ 
	setCurrenTexture,
 }) => {
	const [textureStorage, setTextureStore] = useState([]);
	const [texCount, setTexCount] = useState(0);

	console.log("menu rerender")

	useEffect(() => {
		const getTexStorage = async () => {
			await api.GetTextureStorage()
				.then(res => {
					const links = res.data.map(id => "https://localhost:44404/api/image/" + id);
					setTextureStore(links)
				})
				.catch(err => console.log(err))
		};
		getTexStorage();
	}, []);


	const Send = useCallback(async (img) => {
		try {
			const data = await api.LoadTexture(img)
			const texes = data.data.map((id) => "https://localhost:44404/api/image/" + id)
			setTextureStore([...texes])
			return data
		} catch (e) {
			console.log('error loading texture')
			console.error(e);
			throw e;
		}
	}, [])

	const updateTexStorage = useCallback(async () => {
		await api.GetTextureStorage()
			.then(newTexStore => { 
				const links = newTexStore.data.map(id=>"https://localhost:44404/api/image/" + id)
				setTextureStore(links); })
			.catch(err => console.log("Ошибка подключения к хранилищу" + err))
	}, [])

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
			<TexMenuBtn send={Send} />
			<div className={mainClass.tex_loadMenu}>
				{
					textureStorage.length > 0 &&
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div className={loadClasses.arrowDelete_selectTexMenu}>
							{/* <IconButton onClick={changeTextureDown} >
								<KeyboardArrowLeftIcon />
							</IconButton> */}
							<div>
								<Tooltip title='Delete all textures' placement="left">
									<IconButton onClick={cleanTexStorage}>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							</div>
						</div>
						<div className={loadClasses.selectTexMenu_container}>
							<SelectTexMenu
								updateTexStorage={updateTexStorage}
								textureStorage={textureStorage}
								setTextureStore={setTextureStore}
								texCount={texCount}
								setTexCount={setTexCount}
								setCurrenTexture={setCurrenTexture}
							/>
						</div>
						<div className={loadClasses.arrow_selectTexMenu}>
							{/* <IconButton onClick={changeTextureUp}>
								<KeyboardArrowRightIcon />
							</IconButton> */}
						</div>
					</div>
				}
			</div>
		</>
	);
}

