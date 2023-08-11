import React from 'react';
import { Button, Card, Typography, } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState } from "react";
import barClasses from './styles/bar.module.css'

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
		<Card className={barClasses.sizeBar}>
			<Card className={barClasses.buttonsSizeBar}>
				<Button
					disabled={model.big ? false : true}
					onClick={changeBigButtonColor}
					variant={isBigButtonClicked ? "contained" : 'outlined'}
					sx={{ borderRadius: "10px" }}>
					<Typography fontSize={14}>Big pack</Typography>
				</Button>
				<Button
					disabled={model.small ? false : true}
					onClick={changeSmallButtonColor}
					variant={isSmallButtonClicked ? "contained" : 'outlined'}
					sx={{ borderRadius: "10px" }}>
					<Typography fontSize={14}>Small pack</Typography>
				</Button>
			</Card>
			<Button 
				onClick={modelSetUp} 
				variant='contained' 
				sx={{ borderRadius: "10px" }} 
				endIcon={<FileUploadIcon />}>
				<Typography>Load scene</Typography>
			</Button>
			{!isBigButtonClicked && !isSmallButtonClicked &&
				<Typography color={'red'} fontSize={14}> Select model size*</Typography>}
		</Card>


	)
}