import React from "react";
import { useState, memo } from "react";
import { Button, Typography, Grid, ButtonGroup, Card, Input, InputLabel } from "@mui/material";
import mainClass from './stylesDark/main.module.css'
import mainClassLight from './stylesLight/main.module.css'
import loadClasses from "./stylesLight/loadTex.module.css";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";

export const TexMenuBtn = memo(({ send, isLightTheme }) => {
	const [InputKey, setInputKey] = useState(0);

	console.log("TexMenuBtn rerendered");

	const handleFileChange = (event) => {
		let files = [...event.target.files];

		console.log("файлы c кнопки:", files[0].name);

		let formData = new FormData();
		formData.append(`file`, files[0]);
		formData.append("Content-Type", "multipart/form-data");
		send(formData);

		setInputKey(InputKey + 1);
	};

	return (
		<div className={mainClass.btn_loadMenu}>
			<div className={mainClass.inputCont}>
				<InputLabel className={isLightTheme ? mainClassLight.inputLabel : mainClass.inputLabel} htmlFor="file-input">
					<AddPhotoAlternateRoundedIcon className={loadClasses.loadIcon} />
					<Typography className={loadClasses.text}>LOAD TEXTURE</Typography>
				</InputLabel>
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
			{/* <Button variant="contained" sx={{ borderRadius: '10px' }} >
				<Typography className={loadClasses.text} >
					Send to render
				</Typography>
			</Button> */}
		</div>
	);
});
