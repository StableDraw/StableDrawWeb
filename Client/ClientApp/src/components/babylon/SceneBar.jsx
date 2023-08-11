import React from 'react';
import { SceneCard } from './SceneCard';
import {Paper, Card }from '@mui/material';
import barClasses from'./styles/bar.module.css'


const scenes = [
	{ id: 1, name: "Cart", img: '/babylon/imgPreviewScenes/Cart.jpeg', scene: 'Cart' },
];


export const SceneBar = ({
	toggleSceneBar,
	changeScene,
}) => {

	return (
		<>
		{scenes.map(scene => <SceneCard
					img={scene.img}
					name={scene.name}
					scene={scene.scene}
					toggleSceneBar={toggleSceneBar}
					key={scene.id}
					changeScene={changeScene}
				/>
				)}
		</>
				
	);
};