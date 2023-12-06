import { useState } from 'react';
import styles from '../styles/history.module.css';
import { ToggleBtn } from './toggleBtn';
import { Filter } from './filter';
import { Works } from './works';

const myWorks = [
	{ img: './members/AndreyZaitsev.png', saveTime: '2', id: 100 },
	{ img: '/members/AntonBogdanov.png', saveTime: '2', id: 2645 },
	{ img: '/members/AntonBogdanov.png', saveTime: '2', id: 35645 },
	{ img: '/members/ArtemFedchenko.png', saveTime: '2', id: 44 },
	{ img: '/members/DanilaChernenko.png', saveTime: '2', id: 5436 },
	{ img: '/neurons/ChatGPT.jpg', saveTime: '2', id: 65474 },]

const teamWorks = [
	{ img: './members/SuldeDastai.png', saveTime: '2', id: 10 },
	{ img: '/members/ArtemFedchenko.png', saveTime: '2', id: 20 },
	{ img: '/members/TatianaLebedeva.png', saveTime: '2', id: 40 },
	{ img: '/members/AntonBogdanov.png', saveTime: '2', id: 50 },
	{ img: '/members/SemenSavelev.png', saveTime: '2', id: 70 },
	{ img: '/startPage/backGround.png', saveTime: '2', id: 132 },
	{ img: '/neurons/ChatGPT.jpg', saveTime: '2', id: 100 },
]

export const History = () => {
	const [isTeamWorks, setIsTeamWorks] = useState(false);

	return (
		<div className={styles.main}>
			<span className={styles.historyTxt}>
				История генераций
			</span>
			<ToggleBtn
				leftBtnTxt={'Мои работы'}
				rightBtnTxt={'Работы команды'}
				setShowedContent={setIsTeamWorks} />
			<Filter />

			{isTeamWorks ? <Works works={teamWorks} /> :
				<Works works={myWorks} />}
		</div>
	)
}