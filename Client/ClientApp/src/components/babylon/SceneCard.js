import React from "react";
import Button from '@mui/material/Button';

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
		<div>
			<Button
				onClick={() => {
					SetScene();
					toggleSceneBar()
				}}>
				<img
					src={img}
					alt={name}
					width={200}
					height={'auto'}
				/>
			</Button>
		</div>
	);
};