import React from 'react';
import { Card, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from "react";
import barClasses from './stylesDark/bar.module.css'
import barClassesLight from './stylesLight/bar.module.css'
import {SizeBar} from './sizeBar';


export const ModelsCard = ({ type, model, img, changeModel, isLightTheme }) => {

	return (
		<div >
			<Card className={ isLightTheme ? barClassesLight.modelCard : barClasses.modelCard }>
				<Card className={ isLightTheme ? barClassesLight.dark :  barClasses.dark}></Card>
					<SizeBar changeModel={changeModel} model={model} isLightTheme={isLightTheme} />
					<div className={barClasses.imgCard}>
						<img
							className={barClasses.imgInside}
							src={img}
							alt={type}
						/>
						<div className={barClasses.textCard}>
							<Typography className={ isLightTheme ? barClassesLight.text : barClasses.text} fontFamily={"Helvetica"} >{type}</Typography>
						</div>
					</div>
				</Card>
		</div>

	)
};