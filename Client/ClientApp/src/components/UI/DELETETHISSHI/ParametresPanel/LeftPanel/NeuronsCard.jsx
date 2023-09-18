import React from 'react';
import { Card, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from "react";
import barClasses from './styles/bar.module.css'
import {SizeBar} from './sizeBar';


export const NeuronsCard = ({ type, description, img, changeModel }) => {

	return (
		<div style={{ minWidth: '70%', minHeight: 'auto' }}>
			<Card className={barClasses.modelCard}>
				<Card className={barClasses.dark}></Card>
					<SizeBar changeModel={changeModel} model={description} />
					<div className={barClasses.imgCard}>
						<img
							style={{ borderRadius: '20px' }}
							src={img}
							alt={type}
							width={110}
							height={110}
						/>
						<div className={barClasses.textCard}>
							<Typography fontSize={16} fontFamily={"Helvetica"} >{type}</Typography>
						</div>
					</div>
				</Card>
		</div>

	)
};