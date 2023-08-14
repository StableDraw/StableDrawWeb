import React from "react";
import { Button, Card, Typography } from '@mui/material';
import barClasses from './styles/bar.module.css'
import FileUploadIcon from '@mui/icons-material/FileUpload';


export const SceneCard = ({
	name,
	img,
	scene,
	changeScene
}) => {
	const SetScene = () => {
		changeScene(scene);
	};
	return (
		<div style={{ minWidth: '70%', minHeight: 'auto' }}>
			<Card className={barClasses.modelCard}>
				<Card className={barClasses.dark}></Card>
				<div className={barClasses.imgCard}>
					<img
						style={{ borderRadius: '20px', }}
						src={img}
						alt={name}
						width={250}
						height={'auto'}
					/>
					<div className={barClasses.textCard}>
						<Typography>{name}</Typography>
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