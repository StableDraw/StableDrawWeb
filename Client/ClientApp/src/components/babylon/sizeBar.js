import React from 'react';
import { Button, AppBar, Box, Toolbar, Paper, Card, Typography, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RadioGroup from '@mui/joy/RadioGroup';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';
import { useState } from "react";


// Сделать смену цвета кнопки после клика
export const SizeBar = () => {
	const [amount, setAmount] = useState(1);

	const amountUp = () => {
		if (amount === 10)
			return;
		setAmount(amount + 1);
	};

	const amountDown = () => {
		if (amount === 0)
			return;
		setAmount(amount - 1);
	};


	return (
		<Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', p: '20px', borderRadius: '20px', backgroundColor: 'gray' }}>
			<Card sx={{
				maxWidth: '400px',
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				borderRadius: "20px",
				gap: '10px',
				padding: '10px',
				boxShadow: 'none',
				backgroundColor: '#cccccc'
			}}>
				<Button variant='contained' sx={{ borderRadius: "10px" }}>
					Big pack
				</Button>
				<Button variant='contained' sx={{ borderRadius: "10px" }}>
					Small pack
				</Button>
			</Card>
			<Card sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px', p: '5px', borderRadius: "20px", backgroundColor: '#cccccc' }}>
				<Button variant='outlined' sx={{ borderRadius: "40px" }} onClick={amountDown}>
					<Typography sx={{ fontSize: '20px', color: 'inherit', font:'-moz-initial' }}>-</Typography>
				</Button>
				<Typography sx={{ fontSize: '24px', color: 'inherit' }}>
					{amount}
				</Typography>
				 <Button variant='outlined' sx={{ borderRadius: "40px" }} onClick={amountUp}>
					<Typography sx={{ fontSize: '20px', color: 'inherit', font:'-moz-initial' }}>+</Typography>
				</Button> 
			</Card>
			<Button variant='contained' sx={{ borderRadius: "10px" }}>
					<Typography>Load scene</Typography>
				</Button>
		</Card>


	)
}