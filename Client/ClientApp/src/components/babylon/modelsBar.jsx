import React from 'react';
import { Button, AppBar, Box, Toolbar, Paper, Card } from '@mui/material';
import { useState } from "react";
import { ModelsCard } from './modelCard'
import barClasses from'./styles/bar.module.css'


const models = [
	{ id: 1, type: "Type A", model:{ big: 'TypeABig', small: 'TypeASmall'}, img: '/babylon/imgPreviewModels/StandardPack.png' },
	{ id: 2, type: "Type A with cap", model:{ big: 'TypeABigCap', small: 'TypeASmallCap'}, img: '/babylon/imgPreviewModels/StandardPackCap.png' },
	{ id: 3, type: "Mini", model:{ big: 'Mini', small: ''}, img: '/babylon/imgPreviewModels/mini.jpeg' },
	{ id: 4, type: "Mini with cap", model:{ big: 'MiniCap', small: ''}, img: '/babylon/imgPreviewModels/miniCap.jpeg' },
	// { id: 5, type: "pack with cap", model:{ big: 'PackBigCap', small: 'PackSmallCap'}, img: '/babylon/imgPreviewModels/StandardPack.png' },
];
export const ModelsBar = ({changeModel}) => {

	return (
		<>
		{models.map(model => <ModelsCard
				type = {model.type}
				model={model.model}
				img={model.img}
				key={model.id}
				changeModel={changeModel}
				 />
			)}

		</>

		

			// <Card className={barClasses.bar}>
			

			// </Card>
		
	)
};