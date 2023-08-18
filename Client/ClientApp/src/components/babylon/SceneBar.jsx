import React from 'react';
import { SceneCard } from './SceneCard';
import {Paper, Card }from '@mui/material';
import barClasses from'./stylesLight/bar.module.css'
import { useState, memo } from "react";


const scenes = [
	{ id: 1, name: "Cart", img: '/babylon/imgPreviewScenes/Cart.jpeg', scene: 'Cart01' },
	{ id: 2, name: "Box", img: '/babylon/imgPreviewScenes/box.png', scene: 'Box' },
];


export const SceneBar = memo(({
	toggleSceneBar,
	changeScene,
	setSceneModal,
}) => {
	console.log("sceneBar rerendered");
	return (
		<div className={barClasses.sceneCont}>
		{scenes.map(scene => <SceneCard
					img={scene.img}
					name={scene.name}
					scene={scene.scene}
					toggleSceneBar={toggleSceneBar}
					key={scene.id}
					changeScene={changeScene}
					setSceneModal={setSceneModal}
				/>
				)}
		</div>
	);
});