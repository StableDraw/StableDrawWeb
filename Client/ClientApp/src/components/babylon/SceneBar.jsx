import React from 'react';
import { SceneCard } from './SceneCard';
import {Paper, Card }from '@mui/material';
import barClasses from'./styles/bar.module.css'


//Эти данные должны приходить с бека
const scenes = [
	{ id: 1, name: "trolley", img: '/babylon/imgPreviewScenes/Cart.jpeg', scene: 'Cart' },
	// { id: 2, name: "rack", img: '/babylon/imgPreviewScenes/rack.jpg', scene: '' },
	// { id: 3, name: "shopping box", img: '/babylon/imgPreviewScenes/shopping box.jpg', scene: '' },
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
			<Card className={barClasses.bar}>
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
	);
};