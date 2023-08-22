import React from 'react';
import barClasses from './stylesDark/bar.module.css'
import barClassesLight from './stylesLight/bar.module.css'
import { Button, Card, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useState } from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { themeDark, themeLight } from './customThemes';


export const SizeBar = ({ changeModel, model, isLightTheme }) => {
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
		<div className={isLightTheme ? barClassesLight.sizeBar : barClasses.sizeBar}>
			<Card className={isLightTheme ? barClassesLight.buttonsSizeBar : barClasses.buttonsSizeBar}>
				<div className={barClasses.buttonCont_sizeBar}>
					<Button
						theme={isLightTheme ? themeLight : themeDark}
						className={barClasses.button_sizeBar}
						disabled={model.big ? false : true}
						onClick={changeBigButtonColor}
						variant={isBigButtonClicked ? "contained" : 'outlined'}
					>
						<Typography className={barClasses.text}>Big pack</Typography>
					</Button>
				</div>
				<div className={barClasses.buttonCont_sizeBar}>
					<Button
						theme={isLightTheme ? themeLight : themeDark}
						className={barClasses.button_sizeBar}
						disabled={model.small ? false : true}
						onClick={changeSmallButtonColor}
						variant={isSmallButtonClicked ? "contained" : 'outlined'}
					>
						<Typography className={barClasses.text}>Small pack</Typography>
					</Button>
				</div>

			</Card>
			<Button
				theme={isLightTheme ? themeLight : themeDark}
				onClick={modelSetUp}
				variant='contained'
				className={barClasses.loadButton_sizeBar}
				endIcon={<FileUploadIcon />}>
				<Typography className={barClasses.text}>Load scene</Typography>
			</Button>
			{!isBigButtonClicked && !isSmallButtonClicked &&
				<Typography color={'red'} fontSize={14}> Select model size*</Typography>}
		</div>
	);
}
