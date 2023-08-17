import React from 'react';
import { Card, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from "react";
import barClasses from './stylesLight/bar.module.css'
import {SizeBar} from './sizeBar';


export const ModelsCard = ({ type, model, img, changeModel }) => {

	return (
		<div >
			<Card className={barClasses.modelCard}>
				<Card className={barClasses.dark}></Card>
					<SizeBar changeModel={changeModel} model={model} />
					<div className={barClasses.imgCard}>
						<img
							className={barClasses.imgInside}
							src={img}
							alt={type}
						/>
						<div className={barClasses.textCard}>
							<Typography className={barClasses.text} fontFamily={"Helvetica"} >{type}</Typography>
						</div>
					</div>
				</Card>
		</div>

	)
};