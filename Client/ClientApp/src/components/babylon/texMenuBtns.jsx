import React from 'react';
import { useState } from 'react';
import { Button, Typography, Grid, ButtonGroup, Card, Input, InputLabel, } from '@mui/material';
import mainClass from './styles/main.module.css'

export const TexMenuBtn = ({ send }) => {

	const handleFileChange = (event) => {
		let files = [...event.target.files];
		console.log("файлы c кнопки:", files);

		let formData = new FormData();
		formData.append(`file`, files[0]);
		formData.append("Content-Type", 'multipart/form-data');
		send(formData);
	};

	return (
		<div className={mainClass.btn_loadMenu}>
			<div className={mainClass.inputCont}>
				<InputLabel className={mainClass.inputLabel} htmlFor="file-input">
					<Typography fontSize={15}>
						LOAD TEXTURE
					</Typography>
				</InputLabel>
				<Input
					id="file-input"
					type="file"
					hidden
					inputProps={{
						accept: 'image/*', // Можете указать типы файлов, которые разрешены
					}}
					onChange={handleFileChange}
				/>
			</div>
			<Button variant="contained" sx={{ borderRadius: '10px' }} >
				<Typography fontSize={15} >
					Send to render
				</Typography>
			</Button>
		</div>
	);
}

