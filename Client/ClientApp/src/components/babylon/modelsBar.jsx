import React from 'react';
import { memo } from "react";
import { ModelsCard } from './modelCard'
import barClasses from './stylesLight/bar.module.css'


const models = [
	{ id: 1, type: "Тип А", model: { big: 'TypeABig', small: 'TypeASmall' }, img: '/babylon/imgPreviewModels/StandardPack.png' },
	{ id: 2, type: "Тип А с крышкой", model: { big: 'TypeABigCap', small: 'TypeASmallCap' }, img: '/babylon/imgPreviewModels/StandardPackCap.png' },
	{ id: 3, type: "Мини", model: { big: 'Mini', small: '' }, img: '/babylon/imgPreviewModels/mini.jpeg' },
	{ id: 4, type: "Mини с крышкой", model: { big: 'MiniCap', small: '' }, img: '/babylon/imgPreviewModels/miniCap.jpeg' },
];

const all = {
	scenes: [
		{ id: 1, name: "Корзинка", preview: 'linkToDownload', scene: 'linkToDownload' },
		{ id: 2, name: "Холодильник 1", preview: 'linkToDownload', scene: 'linkToDownload' },
		{ id: 3, name: "Холодильник 2", preview: 'linkToDownload', scene: 'linkToDownload' },
		{ id: 4, name: "Тележка", preview: 'linkToDownload', scene: 'linkToDownload' },
	],
	models: [
		{ id: 1, name: "Тип А", model: { big: 'linkToDownload', small: 'linkToDownload' }, preview: 'linkToDownload' },
		{ id: 2, name: "Тип А с крышкой", model: { big: 'linkToDownload', small: 'linkToDownload' }, preview: 'linkToDownload' },
		{ id: 3, name: "Мини", model: { big: 'linkToDownload', small: '' }, preview: 'linkToDownload' },
		{ id: 4, name: "Mини с крышкой", model: { big: 'linkToDownload', small: '' }, preview: 'linkToDownload' },
	],
	envMaps: [
		{ id: 1, name: "whiteSky", data: 'linkToDownload' },
	],
}



export const ModelsBar = memo(({ changeModel, isLightTheme }) => {

	return (
		<div className={barClasses.modelsCont}>
			{models.map(model => <ModelsCard
				type={model.type}
				model={model.model}
				img={model.img}
				key={model.id}
				changeModel={changeModel}
				isLightTheme={isLightTheme}
			/>
			)}
		</div>
	)
});