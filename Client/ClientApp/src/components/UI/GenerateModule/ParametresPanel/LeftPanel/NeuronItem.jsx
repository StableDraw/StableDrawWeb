import React from 'react';
import { Button, AppBar, Box, Toolbar, Paper, Card } from '@mui/material';
import { useState } from "react";
import { NeuronsCard } from './NeuronsCard'
import barClasses from'./styles/bar.module.css'


const neurons = [
	{ id: 1, type: "Chat GPT", description:"Чат-бот с искусственным интеллектом, разработанный компанией OpenAI и способный работать в диалоговом режиме, поддерживающий запросы на естественных языках.", img: '/neurons/ChatGPT.jpg' },
	{ id: 2, type: "Midjourney", description:"Midjourney — это ИИ, который создает изображения из текстовых описаний, подобно DALL-E", img: '/neurons/Midjourney.png' },
	{ id: 3, type: "Kandinsky", description:"Kandinsky — проект, сервис и приложение компании «Сбер», с помощью которого пользователи могут генерировать изображения по текстовому описанию с помощью нейросетей.", img: '/neurons/Kandinsky.webp' },
	{ id: 4, type: "YandexGPT", description:"Находящаяся на этапе тестирования нейросеть семейства GPT от компании «Яндекс», которая генерирует тексты на основе данных из интернета.", img: '/neurons/YandexGPT.webp' },
    { id: 5, type: "DALL-E", description:"DALLE 2 — это представленная компанией OpenAI нейросеть, которая генерирует изображения, используя современные алгоритмы глубокого обучения", img: '/neurons/dall-e.webp' },
    { id: 6, type: "LoveGPT", description:"Enhance your romantic relationships with LoveGPT, an AI-powered platform that helps you initiate interesting conversations & build stronger connections", img: '/neurons/LoveGPT.jpg' },
];
export const NeuronItem = ({changeNeuron}) => {

	return (
		<div className={barClasses.cont}>
		{neurons.map(neuron => <NeuronsCard
				type = {neuron.type}
				description={neuron.description}
				img={neuron.img}
				key={neuron.id}
				changeNeuron={changeNeuron}
				 />
			)}
		</div>
	)
};