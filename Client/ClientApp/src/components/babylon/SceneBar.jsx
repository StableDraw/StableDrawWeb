import React from 'react';
import { SceneCard } from './SceneCard';
import barClasses from'./stylesLight/bar.module.css'
import { memo } from "react";


const scenes = [
	{ id: 1, name: "Корзинка", img: '/babylon/imgPreviewScenes/box.png', scene: 'Box' },
	{ id: 2, name: "Холодильник 1", img: '/babylon/imgPreviewScenes/Fridge.png', scene: 'Fridge' },
	{ id: 3, name: "Холодильник 2", img: '/babylon/imgPreviewScenes/FridgeSmall.png', scene: 'FridgeSmall' },
	{ id: 4, name: "Тележка", img: '/babylon/imgPreviewScenes/Cart.jpeg', scene: 'Cart' },
];

export const SceneBar = memo(({
	toggleSceneBar,
	changeScene,
	setSceneModal,
	isLightTheme,
}) => {
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
					isLightTheme={isLightTheme}
				/>
				)}
		</div>
	);
});