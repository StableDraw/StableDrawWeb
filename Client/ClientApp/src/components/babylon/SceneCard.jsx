import React from "react";
import { Button, Card, Typography } from '@mui/material';
import barClasses from './stylesLight/bar.module.css'
import FileUploadIcon from '@mui/icons-material/FileUpload';


export const SceneCard = ({
	name,
	img,
	scene,
	changeScene,
	setSceneModal, 
}) => {
	const SetScene = () => {
		changeScene(scene);
		setSceneModal(name);
	};
	return (
		<div >
			<Card className={barClasses.modelCard}>
				<Card className={barClasses.dark}></Card>
				<div className={barClasses.imgCard}>
					<img
						className={barClasses.imgInside}
						src={img}
						alt={name}
					/>
					<div className={barClasses.textCard}>
						<Typography className={barClasses.text}>{name}</Typography>
					</div>
				</div>
				<div className={barClasses.sizeBar}>
					<Button
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