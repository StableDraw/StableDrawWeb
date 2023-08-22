import React from "react";
import { Button, Card, Typography } from '@mui/material';
import barClasses from './stylesDark/bar.module.css'
import barClassesLight from './stylesLight/bar.module.css'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { themeDark, themeLight } from './customThemes';


export const SceneCard = ({
	name,
	img,
	scene,
	changeScene,
	setSceneModal,
	isLightTheme, 
}) => {
	const SetScene = () => {
		changeScene(scene);
		setSceneModal(name);
	};
	return (
		<div >
			<Card className={ isLightTheme ? barClassesLight.modelCard : barClasses.modelCard}>
				<Card className={ isLightTheme ? barClassesLight.dark :  barClasses.dark}></Card>
				<div className={barClasses.imgCard}>
					<img
						className={barClasses.imgInside}
						src={img}
						alt={name}
					/>
					<div className={isLightTheme ? barClassesLight.textCard : barClasses.textCard}>
						<Typography className={isLightTheme ? barClassesLight.text : barClasses.text}>{name}</Typography>
					</div>
				</div>
				<div className={isLightTheme ? barClassesLight.sizeBar : barClasses.sizeBar}>
					<Button
						theme={isLightTheme ? themeLight : themeDark}
						onClick={SetScene}
						variant='contained'
						className={barClasses.loadButton_sizeBar}
						endIcon={<FileUploadIcon />}>
						<Typography>Load scene</Typography>
					</Button>
				</div>
			</Card>
		</div>
	);
};