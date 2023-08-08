import React from "react";
import { Button, Card, Typography } from '@mui/material';
import barClasses from './styles/bar.module.css'


// interface Props {
// 	name: string;
// 	img: string;
// 	scene: string;
// 	toggleSceneBar: () => void;
// 	changeScene: (scene: string) => void;
// }

export const SceneCard = ({
	name,
	img,
	scene,
	toggleSceneBar,
	changeScene
}) => {
	const SetScene = () => {
		changeScene(scene);
	};
	return (
		<Card
			className={barClasses.modelCard}
			>
			<Button
				onClick={() => {
					SetScene();
					toggleSceneBar()
				}}>
				<div className={barClasses.imgCard}>
					<img
						style={{ borderRadius: '20px', }}
						src={img}
						alt={name}
						width={250}
						height={'auto'}
					/>
					<div className={barClasses.textCard}>
						<Typography>{name}</Typography>
					</div>
				</div>

			</Button>
		</Card>
	);
};