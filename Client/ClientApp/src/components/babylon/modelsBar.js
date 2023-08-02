import React from 'react';
import { Button, AppBar, Box, Toolbar, Paper, Card } from '@mui/material';
import RadioGroup from '@mui/joy/RadioGroup';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormLabel from '@mui/joy/FormLabel';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useState } from "react";
import { ModelsCard } from './modelCard'


const models = [
	{ id: 1, name: "standard pack", model: 'PackNonTexBig', img: '/babylon/imgPreviewModels/StandardPack.png' },
	// { id: 2, name: "standard pack", model: 'PackNonTexBig', img: '/babylon/imgPreviewModels/StandardPack.png' },
	// { id: 3, name: "standard pack", model: 'PackNonTexBig', img: '/babylon/imgPreviewModels/StandardPack.png' },
	// {id: 4, name: "standard pack", model: 'PackNonTexBig', img: '/babylon/imgPreviewModels/StandardPack.png'},
	// {id: 5, name: "standard pack", model: 'PackNonTexBig', img: '/babylon/imgPreviewModels/StandardPack.png'},
];

export const ModelsBar = () => {

	return (
		<Card sx={{
			display: "flex",
			flexDirection: 'column',
			gap: "10px", p: "30px",
			justifyContent: "center",
			maxWidth: '600px',
			position: 'absolute',
			borderRadius: '20px'
		}}>
			{models.map(model => <ModelsCard
				name={model.name}
				model={model.model}
				img={model.img}
				key={model.id} />
			)}

		</Card>
	)
};