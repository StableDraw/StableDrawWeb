import React from 'react';
import { useState, memo } from 'react';
import { Button, Typography, Grid, ButtonGroup, Card, Input, InputLabel, } from '@mui/material';
import mainClass from './styles/main.module.css'

export const TexMenuBtn = memo(({ send }) => {

	const [InputKey, setInputKey] = useState(0);

	console.log("TexMenuBtn rerendered")

	const handleFileChange = (event) => {
		let files = [...event.target.files];

		console.log("файлы c кнопки:", files);
		
		let formData = new FormData();
		formData.append(`file`, files[0]);
		formData.append("Content-Type", 'multipart/form-data');
		send(formData);

		setInputKey(InputKey + 1);
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
			<Button variant="contained" sx={{ borderRadius: '10px' }} >
				<Typography fontSize={15} >
					Send to render
				</Typography>
			</Button>
		</div>
	);
})

