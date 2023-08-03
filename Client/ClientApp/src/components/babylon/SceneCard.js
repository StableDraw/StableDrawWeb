import React from "react";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

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
			<Paper sx={{
				display: 'flex',
				justifyContent: "center",
				p: '3px',
				flexDirection: 'column',
				borderRadius: '20px',
				minWidth: '250px'}}>
				<Button
					onClick={() => {
						SetScene();
						toggleSceneBar()
					}}>
					<div style={{ display: 'flex', justifyContent: "center", flexDirection: 'column' }}>
						<img
							style={{ borderRadius: '20px' }}
							src={img}
							alt={name}
							width={250}
							height={'auto'}
						/>
						<div style={{ padding: '5px', display: 'flex', justifyContent: 'center' }}>
							<span>{name}</span>
						</div>
					</div>

				</Button>
			</Paper>
	);
};