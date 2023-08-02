import React from 'react';
import { SceneCard } from './SceneCard';
import Paper from '@mui/material/Paper';
import { Card } from 'reactstrap';

//Эти данные должны приходить с бека
const scenes = [
	{ id: 1, name: "trolley", img: '/babylon/imgPreviewScenes/Cart.jpeg', scene: 'Cart' },
	{ id: 2, name: "rack", img: '/babylon/imgPreviewScenes/rack.jpg', scene: '' },
	{ id: 3, name: "shopping box", img: '/babylon/imgPreviewScenes/shopping box.jpg', scene: '' },
];

// interface Props {
// 	toggleSceneBar: () => void;
// 	changeScene: (scene: string) => void;
// }

export const SceneBar = ({
	toggleSceneBar,
	changeScene,
}) => {

	return (
		<div style={{ display: 'flex', justifyContent: "flex-end",}}>
			<Card sx={{
				display: "flex",
				padding: 10,
				flexDirection: "column",
				justifyContent: "flex-start",
				position: "absolute",
				overflowY: "scroll",
				maxWidth: "400px",
				maxHeight: "auto",
				borderRadius: "8px",
			}}>
				{scenes.map(scene => <SceneCard
					img={scene.img}
					name={scene.name}
					scene={scene.scene}
					toggleSceneBar={toggleSceneBar}
					key={scene.id}
					changeScene={changeScene}
				/>
				)}
			</Card>
		</div>
	);
};