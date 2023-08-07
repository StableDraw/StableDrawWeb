import React from 'react';
import { Button, AppBar, Box, Toolbar, Paper, Card } from '@mui/material';
import { useState } from "react";
import { ModelsCard } from './modelCard'
import barClasses from'./styles/bar.module.css'

// Отфотать модельки!!
const models = [
	{ id: 1, type: "standard pack", model:{ big: 'PackBig', small: 'PackSmall'}, img: '/babylon/imgPreviewModels/StandardPack.png' },
	{ id: 2, type: "pack with cap", model:{ big: 'PackBigCap', small: 'PackSmallCap'}, img: '/babylon/imgPreviewModels/StandardPack.png' },
];

export const ModelsBar = ({changeModel, toggleModelBar}) => {
// есть проблема с borderRadius.
	return (
			<Card className={barClasses.bar}>
			{models.map(model => <ModelsCard
				type = {model.type}
				model={model.model}
				img={model.img}
				key={model.id}
				changeModel={changeModel}
				toggleModelBar={toggleModelBar} />
			)}

			</Card>
		
	)
};