import React from "react";
import loadClasses from './styles/loadTex.module.css';
import { TexMenuBtn } from "./texMenuBtns";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography, Grid, ButtonGroup, Card, IconButton, Tooltip } from '@mui/material';
import mainClass from './styles/main.module.css'
import { SelectTexMenu } from "./selectTexMenu";
import { useMemo, useState, useEffect } from "react";
import api from '../../api/api'



export const Menu = ({ 
	currenTexture, 
	texCount, 
	setTexCount, 
	send,
	setCurrenTexture,
 }) => {
		const [textureStorage, setTextureStore] = useState([]);

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
			<TexMenuBtn send={send} />
			<div className={mainClass.tex_loadMenu}>
				{
					currenTexture.length > 0 &&
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div className={loadClasses.arrowDelete_selectTexMenu}>
							<IconButton onClick={changeTextureDown} >
								<KeyboardArrowLeftIcon />
							</IconButton>
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
								cleanStorage={cleanTexStorage}
								currenTexture={currenTexture}
								changeTextureDown={changeTextureDown}
								changeTextureUp={changeTextureUp}
								texCount={texCount}
								setTexCount={setTexCount}
								deleteTex={deleteTex}
							/>
						</div>
						<div className={loadClasses.arrow_selectTexMenu}>
							<IconButton onClick={changeTextureUp}>
								<KeyboardArrowRightIcon />
							</IconButton>
						</div>
					</div>

				}
			</div>
		</>
	);
}

