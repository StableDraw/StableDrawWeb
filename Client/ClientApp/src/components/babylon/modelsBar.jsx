import React from 'react';
import { memo } from "react";
import { ModelsCard } from './modelCard'
import barClasses from './stylesLight/bar.module.css'
import { SkeletonCard } from './UI_skeleton/SkeletonCard';


const models = [
	{ id: 1, type: "Тип А", model: { big: 'TypeABig', small: 'TypeASmall' }, img: '/babylon/imgPreviewModels/StandardPack.png' },
	{ id: 2, type: "Тип А с крышкой", model: { big: 'TypeABigCap', small: 'TypeASmallCap' }, img: '/babylon/imgPreviewModels/StandardPackCap.png' },
	{ id: 3, type: "Мини", model: { big: 'Mini', small: '' }, img: '/babylon/imgPreviewModels/mini.jpeg' },
	{ id: 4, type: "Mини с крышкой", model: { big: 'MiniCap', small: '' }, img: '/babylon/imgPreviewModels/miniCap.jpeg' },
];

const skeletonArray = [1, 2, 3, 4];

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



export const ModelsBar = memo(({ changeModel, isLightTheme, modelStaff }) => {
	return (
		<div className={barClasses.modelsCont}>
			{Boolean(modelStaff) ? modelStaff.data.models.map(model => <ModelsCard
				name={model.name}
				model={model.modelsDict}
				img={model.preview}
				key={model.id}
				changeModel={changeModel}
				isLightTheme={isLightTheme}
			/>) :
				skeletonArray.map(i => <SkeletonCard key={i} />)}
		</div>
	)
});