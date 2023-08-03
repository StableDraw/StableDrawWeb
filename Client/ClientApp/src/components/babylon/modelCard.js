import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState } from "react";
import { SizeBar } from './sizeBar';
import { Card } from 'reactstrap';

export const ModelsCard = ({ type, model, img, changeModel }) => {
	const [isVisible, setIsVisible] = useState(false);

	const showSizeBar = () => {
		setIsVisible(!isVisible);
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', }}>
			<Paper sx={{
				display: 'flex',
				justifyContent: "center",
				p: '3px',
				flexDirection: 'column',
				borderRadius: '20px',
				borderBottomLeftRadius: '0',
				borderBottomRightRadius: '0',
				minWidth: '250px',
			}}>
				<Button onClick={showSizeBar}>
					<div style={{ display: 'flex', justifyContent: "center", flexDirection: 'column' }}>
						<img
							style={{ borderRadius: '20px' }}
							src={img}
							alt={type}
							width={250}
							height={'auto'}
						/>
						<div style={{ padding: '5px', display: 'flex', justifyContent: 'center' }}>
							<span>{type}</span>
						</div>
					</div>
				</Button>
			</Paper>
			{isVisible &&
				<SizeBar changeModel={changeModel} model={model}/>}
		</div>
	)
};