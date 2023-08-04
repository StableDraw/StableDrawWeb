import React from 'react';
import{ Card, Typography }from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from "react";
import { SizeBar } from './sizeBar';
import barClasses from'./styles/bar.module.css'


export const ModelsCard = ({ type, model, img, changeModel, toggleModelBar }) => {
	const [isVisible, setIsVisible] = useState(false);

	const showSizeBar = () => {
		setIsVisible(!isVisible);
	}
//borderRadius приходится применять через sx из - за специфики material ui :(
	return (
		<div >
			<Card 
			sx={{borderRadius:'20px', borderBottomLeftRadius:0, borderBottomRightRadius:0}}
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
				<SizeBar changeModel={changeModel} model={model} toggleModelBar = {toggleModelBar}/>}
		</div>
	)
};