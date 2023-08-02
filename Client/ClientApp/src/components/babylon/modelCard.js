import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState } from "react";
import { SizeBar } from './sizeBar';
import { Card } from 'reactstrap';

export const ModelsCard = ({name, model, img}) => {
	const [isVisible, setIsVisible] = useState(false);

	const showSizeBar = () => {
		setIsVisible(!isVisible);
	}

	return (
		<>
		<Paper sx={{display:'flex', justifyContent:"center", p:'3px', flexDirection:'column', borderRadius: '20px', minWidth: '250px'}}>
		<Button>
			<div style={{display:'flex', justifyContent:"center",flexDirection:'column' }}>
				<img
			style={{borderRadius: '20px'}}
			onClick={showSizeBar}
			src={img}
			alt={name}
			width={250}
			height={'auto'}
			/>
		<div style={{padding:'5px', display:'flex', justifyContent:'center' }}>
		 <span>{name}</span>
		</div>
			</div>
		</Button>
	</Paper>
		{isVisible && 
				<SizeBar/>}
		</>
	)
};