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

// Вид JSON modelStaff; обращаться: modelStaff.data.
// "Babylon": {
// 	"Scenes": [
// 		{ "id": 1, "name": "Корзинка", "preview": "box.png", "scene": "Box.glb" },
// 		{ "id": 2, "name": "Холодильник 1", "preview": "Fridge.png", "scene": "Fridge.glb" },
// 		{ "id": 3, "name": "Холодильник 2", "preview": "FridgeSmall.png", "scene": "FridgeSmall.glb" },
// 		{ "id": 4, "name": "Тележка", "preview": "Cart.jpeg", "scene": "Cart.glb" }],
// 	"Models": [
// 		{ "id": 1, "name": "Тип А","modelsDict": { "big": "TypeABig.glb", "small": "TypeASmall.glb" }, "preview": "StandardPack.png" },
// 		{ "id": 2, "name": "Тип А с крышкой", "modelsDict": { "big": "TypeABigCap.glb", "small": "TypeASmallCap.glb" }, "preview": "StandardPackCap.png" },
// 		{ "id": 3, "name": "Мини", "fileName":"", "modelsDict": { "big": "Mini.glb"}, "preview": "mini.jpeg" },
// 		{ "id": 4, "name": "Mини с крышкой", "fileName":"", "modelsDict": { "big": "MiniCap.glb"}, "preview": "miniCap.jpeg" }
// 	],
// 	"EnvMaps": [
// 		{ "id": 1, "name": "whiteSky", "data": "WhiteSky.env" }
// 	]
// }

export const SceneBar = memo(({
	toggleSceneBar,
	changeScene,
	setSceneModal,
	isLightTheme,
	modelStaff
}) => {
	return (
		<div className={barClasses.sceneCont}>
		{modelStaff.data.scenes.map(scene => <SceneCard
					preview={scene.preview}
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