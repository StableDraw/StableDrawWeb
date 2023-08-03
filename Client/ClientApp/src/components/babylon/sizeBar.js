import React from 'react';
import { Button, AppBar, Box, Toolbar, Paper, Card, Typography, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import RadioGroup from '@mui/joy/RadioGroup';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';
import { useState } from "react";


export const SizeBar = ({changeModel, model}) => {
	const [amount, setAmount] = useState(1);
	const [isSmallButtonClicked, setIsSmallButtonClicked] = useState(false);
	const [isBigButtonClicked, setIsBigButtonClicked] = useState(true);

	const amountUp = () => {
		if (amount === 10)
			return;
		setAmount(amount + 1);
	};

	const amountDown = () => {
		if (amount === 1)
			return;
		setAmount(amount - 1);
	};

	const changeSmallButtonColor = () => {
		setIsBigButtonClicked(false);
		setIsSmallButtonClicked(!isSmallButtonClicked);
	}

	const changeBigButtonColor = () => {
		setIsSmallButtonClicked(false);
		setIsBigButtonClicked(!isBigButtonClicked);
	}

	const modelSetUp = () => {
		console.log(model);
		if (isSmallButtonClicked)
			changeModel(model.small)
		if(isBigButtonClicked)
			changeModel(model.big)
	};

	return (
		<Card sx={{ 
			display: 'flex', 
			flexDirection: 'column', 
			justifyContent: 'center', 
			gap: '10px', p: '20px', 
			borderRadius: '20px', 
			borderTopLeftRadius:'0',
			borderTopRightRadius:'0', 
			backgroundColor: 'gray', }}>
			<Card sx={{
				maxWidth: '400px',
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				borderRadius: "20px",
				gap: '10px',
				padding: '10px',
				boxShadow: 'none',
				backgroundColor: '#cccccc',
			}}>
				<Button onClick={changeBigButtonColor} variant={isBigButtonClicked ? "contained" : 'outlined'} sx={{ borderRadius: "10px" }}>
					Big pack
				</Button>
				<Button onClick={changeSmallButtonColor} variant={isSmallButtonClicked ? "contained" : 'outlined'} sx={{ borderRadius: "10px" }}>
					Small pack
				</Button>
			</Card>
			<Card sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px', p: '5px', borderRadius: "20px", backgroundColor: '#cccccc' }}>
				<Button variant='outlined' sx={{ borderRadius: "40px" }} onClick={amountDown}>
					<Typography sx={{ fontSize: '20px', color: 'inherit', font: '-moz-initial' }}>-</Typography>
				</Button>
				<Typography sx={{ fontSize: '24px', color: 'inherit' }}>
					{amount}
				</Typography>
				<Button variant='outlined' sx={{ borderRadius: "40px" }} onClick={amountUp}>
					<Typography sx={{ fontSize: '20px', color: 'inherit', font: '-moz-initial' }}>+</Typography>
				</Button>
			</Card>
			<Button onClick={modelSetUp} variant='contained' sx={{ borderRadius: "10px" }} endIcon={<FileUploadIcon />}>
				<Typography>Load scene</Typography>
			</Button>
		</Card>


	)
}