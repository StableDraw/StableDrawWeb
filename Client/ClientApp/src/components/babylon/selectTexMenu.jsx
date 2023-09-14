import React from "react";
import { Button, IconButton, Tooltip, Input, InputLabel } from '@mui/material';
import loadClasses from './stylesDark/loadTex.module.css';
import loadClassesLight from './stylesLight/loadTex.module.css';
import CancelIcon from '@mui/icons-material/Cancel';
// import { TexMenuBtn } from "./texMenuBtns";
import {  useState, } from "react";
import api from '../../api/api'
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { base64ToLinkImg } from "./base64ToLink.ts";

export const SelectTexMenu = ({
	setCurrenTexture,
	texCount,
	setTexCount,
	textureStorage = [],
	updateTexStorage,
	isLightTheme,
	send,
}) => {
	const [InputKey, setInputKey] = useState(0);

	async function deleteTex(imageName, index) {
		await api.DeleteTexture(imageName)
		.then(()=>updateTexStorage())
		.catch(err => console.log("Ошибка при удалении текстуры: ", err));
		
		//логика перестановки рамки выбора и смены текстуры в сцене после удаления:
		if (index < texCount) {
			setTexCount(texCount - 1);
			return;
		}
		if (index === texCount) {
			if (index) {
				setCurrenTexture(textureStorage[index - 1].bytes);
				setTexCount(index - 1);
			}
			else {
				if (!textureStorage.length) {
					//тут баг: при пустом массиве(в теории), сюда всё равно не попадаем, меняю состояние в updateTexStorage.
					setCurrenTexture('');
					return;
				}
				setCurrenTexture(textureStorage[index + 1]?.bytes);
			}
		}
	}

	const handleFileChange = (event) => {
		let files = [...event.target.files];

		let formData = new FormData();
		formData.append(`file`, files[0]);
		formData.append("Content-Type", 'multipart/form-data');
		send(formData);

		setInputKey(InputKey + 1); // Позволяет загружать несколько одинаковых файлов подряд
	};
	return (
		<>
			<div>
			</div>
			<div className={loadClasses.selectTexMenu}>
				<div className={loadClasses.buttons_selectTexMenu}>
					<div className={loadClasses.selectTexMenu}>
						<div className={loadClasses.previewTexes_selectTexMenu}>
							{textureStorage.map((tex, index) =>
								<div className={loadClasses.buttons_selectTexMenu} key={tex + index + index}>
									<div className={loadClasses.closeButton_selectTexMenu} key={tex + index + tex}>
										<IconButton
											key={tex + index}
											sx={{ width: '20px', height: '20px', }}
											onClick={() => { deleteTex(tex.imageName, index); }} >
											<CancelIcon
												className={isLightTheme ? loadClassesLight.crossIcon : loadClasses.crossIcon}
												key={index + tex + index + tex}
												sx={{ width: '20px', height: '20px' }} />
										</IconButton>
									</div>
									<Button onClick={() => { setTexCount(index); setCurrenTexture(tex.bytes) }} key={tex + tex}>
										<div key={tex + index}>
											<img src={base64ToLinkImg(tex.bytes)}
												alt="texture"
												className={loadClasses.texImg_selectTexMenu}
												style={{ border: index === texCount ? '3px solid #1976d2' : 'none' }}
												key={tex} />
										</div>
									</Button>
								</div>
							)}
							{
								textureStorage.length === 0 ?
									<InputLabel htmlFor="file-input">
										<div className={isLightTheme ? loadClassesLight.addIconContMain : loadClasses.addIconContMain}>
											<Tooltip title='Загрузить текстуру' placement="top">
												<AddPhotoAlternateRoundedIcon className={isLightTheme ? loadClassesLight.addIconMain : loadClasses.addIconMain } />
											</Tooltip>
										</div>
									</InputLabel> :
									<InputLabel htmlFor="file-input">
										<div className={ isLightTheme ? loadClassesLight.addIconCont : loadClasses.addIconCont}>
											<Tooltip title='Загрузить текстуру' placement="right">
												<AddCircleOutlineIcon className={ isLightTheme ? loadClassesLight.addIcon : loadClasses.addIcon} />
											</Tooltip>
										</div>
									</InputLabel>
							}
							<Input
								key={InputKey}
								id="file-input"
								type="file"
								hidden
								multiple={true}
								inputProps={{
									accept: 'image/*',
									multiple: true,
								}}
								onChange={handleFileChange}
							/>
						</div>
					</div>
				</div>
			</div>
		</>



	)
}