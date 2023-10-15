import React from 'react';
import { memo } from "react";
import { ModelsCard } from './modelCard'
import barClasses from'./stylesLight/bar.module.css'


const models = [
	{ id: 1, type: "Тип А", model:{ big: 'TypeABig', small: 'TypeASmall'}, img: '/babylon/imgPreviewModels/StandardPack.png' },
	{ id: 2, type: "Тип А с крышкой", model:{ big: 'TypeABigCap', small: 'TypeASmallCap'}, img: '/babylon/imgPreviewModels/StandardPackCap.png' },
	{ id: 3, type: "Мини", model:{ big: 'Mini', small: ''}, img: '/babylon/imgPreviewModels/mini.jpeg' },
	{ id: 4, type: "Mини с крышкой", model:{ big: 'MiniCap', small: ''}, img: '/babylon/imgPreviewModels/miniCap.jpeg' },
];

const all = [
	{id: 1, type: 'model', name: 'Тип А', model: { big: 'byteArray', small: 'byteArray'}, preview: 'img/byteArray' },
	{id: 2, type: 'model', name: 'Мини', model: { big: 'byteArray', small: ''}, preview: 'img/byteArray' },
]	

export const ModelsBar = memo(({changeModel, isLightTheme}) => {

	return (
		<div className={barClasses.modelsCont}>
		{models.map(model => <ModelsCard
				type = {model.type}
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