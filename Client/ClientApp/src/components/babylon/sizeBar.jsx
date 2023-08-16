import React from 'react';
import barClasses from './styles/bar.module.css'
import { Button, Card, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useState } from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload';


 export const SizeBar = ({ changeModel, model }) => {
	const [isSmallButtonClicked, setIsSmallButtonClicked] = useState(false);
	const [isBigButtonClicked, setIsBigButtonClicked] = useState(true);

	const changeSmallButtonColor = () => {
		setIsBigButtonClicked(false);
		setIsSmallButtonClicked(!isSmallButtonClicked);
	}

	const changeBigButtonColor = () => {
		setIsSmallButtonClicked(false);
		setIsBigButtonClicked(!isBigButtonClicked);
	}

	const modelSetUp = () => {
		if (isSmallButtonClicked && model.small)
			changeModel(model.small);

		if (isBigButtonClicked && model.big)
			changeModel(model.big);
	};
	return (
		<div className={barClasses.sizeBar}>
			<Card className={barClasses.buttonsSizeBar}>

				<div className={barClasses.button_sizeBar}>
					<Button
					disabled={!model.big}
					onClick={changeBigButtonColor}
					variant={isBigButtonClicked ? "contained" : 'outlined'}
					sx={{ borderRadius: "10px", width:'100%', height:'100%' }}>
					<Typography fontSize={14}>Big pack</Typography>
				</Button>
				</div>
				<div className={barClasses.button_sizeBar}>

				<Button
					disabled={!model.small}

					onClick={changeSmallButtonColor}
					variant={isSmallButtonClicked ? "contained" : 'outlined'}
					sx={{ borderRadius: "10px", width:'100%', height:'100%' }}>
					<Typography fontSize={14}>Small pack</Typography>
				</Button>
				</div>
				
			</Card>
			<Button
				onClick={modelSetUp}
				variant='contained'
				className={barClasses.loadButton_sizeBar}
				endIcon={<FileUploadIcon />}>
				<Typography>Load scene</Typography>
			</Button>
			{!isBigButtonClicked && !isSmallButtonClicked &&
				<Typography color={'red'} fontSize={14}> Select model size*</Typography>}
		</div>
	);
}
