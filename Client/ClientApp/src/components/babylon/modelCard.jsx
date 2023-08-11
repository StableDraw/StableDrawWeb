import React from 'react';
import { Card, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from "react";
import { SizeBar } from './sizeBar';
import barClasses from './styles/bar.module.css'


export const ModelsCard = ({ type, model, img, changeModel }) => {
	const [isVisible, setIsVisible] = useState(false);

	const showSizeBar = () => {
		setIsVisible(!isVisible);
	}
	return (
		<div style={{ minWidth: '80%', minHeight: 'auto' }}>
			<Card
				className={barClasses.modelCard}>
				<Button onClick={showSizeBar}>
					<div className={barClasses.imgCard}>
						<img
							style={{ borderRadius: '20px' }}
							src={img}
							alt={type}
							width={250}
							height={'auto'}
						/>
						<div className={barClasses.textCard}>
							<Typography>{type}</Typography>
						</div>
					</div>
				</Button>
			</Card>
			{isVisible &&
				<SizeBar changeModel={changeModel} model={model} />}
		</div>

	)
};