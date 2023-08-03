import React from 'react';
import { Button, AppBar, Box, Toolbar, Paper, Card } from '@mui/material';
import { useState } from "react";
import { ModelsCard } from './modelCard'


const models = [
	{ id: 1, type: "standard pack", model:{ big: 'PackNonTexBig', small: 'PackNonTexSmall'}, img: '/babylon/imgPreviewModels/StandardPack.png' },
	// { id: 2, name: "standard pack", model: 'PackNonTexBig', img: '/babylon/imgPreviewModels/StandardPack.png' },
	// { id: 3, name: "standard pack", model: 'PackNonTexBig', img: '/babylon/imgPreviewModels/StandardPack.png' },
	// {id: 4, name: "standard pack", model: 'PackNonTexBig', img: '/babylon/imgPreviewModels/StandardPack.png'},
	// {id: 5, name: "standard pack", model: 'PackNonTexBig', img: '/babylon/imgPreviewModels/StandardPack.png'},
];

export const ModelsBar = ({changeModel}) => {

	return (
			<Card sx={{
			display: "flex",
			flexDirection: 'column',
			gap: "10px", 
			p: "30px",
			justifyContent: "center",
			maxWidth: '600px',
			position: 'absolute',
			borderRadius: '20px'
		}}>
			{models.map(model => <ModelsCard
				type = {model.type}
				model={model.model}
				img={model.img}
				key={model.id}
				changeModel={changeModel} />
			)}

			</Card>
		
	)
};