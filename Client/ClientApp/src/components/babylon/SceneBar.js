import React from 'react';
import { SceneCard } from './SceneCard';
import Paper from '@mui/material/Paper';

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
			<Paper elevation={1} style={{
				display: "flex",
				padding: 10,
				flexDirection: "row",
				justifyContent: "flex-start",
				position: "absolute",
				overflowX: "scroll",
				maxWidth: "700px",
				maxHeight: "auto",
				border: "3px solid white",
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
			</Paper>
		</div>
	);
};