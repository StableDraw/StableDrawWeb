import React from 'react';
import { useState, memo, } from "react";
import styles from '../styles/toggleBtn.module.css'

export const ToggleBtn = memo(() => {
	const [isMyWorks, setIsMyWorks] = useState(true);
	const [isTeamWorks, setIsTeamWorks] = useState(false)

	const showMyWorks = () => {
		setIsTeamWorks(false)
		setIsMyWorks(true)
	}

	const showTeamWorks = () => {
		setIsMyWorks(false)
		setIsTeamWorks(true)
	}

	return (
		<div className={styles.bar}>
			<div className={styles.selectButtons}>
				<button
					onClick={showMyWorks}
					className={isMyWorks ? styles.selectButton1_select : styles.selectButton1}>

					<span className={isMyWorks ? styles.selectTxt_select : styles.selectTxt}>
						Mои работы
					</span>

				</button>
				<button
					onClick={showTeamWorks}
					className={isTeamWorks ? styles.selectButton2_select : styles.selectButton2}>
					<span className={isTeamWorks ? styles.selectTxt_select : styles.selectTxt}>
						Работы команды
					</span>

				</button>
			</div>
			{/* {isModelsBar ? <ModelsBar modelStaff={modelStaff} changeModel={changeModel} isLightTheme={isLightTheme} /> :
				<SceneBar modelStaff={modelStaff} changeScene={changeScene} setSceneModal={setSceneModal} isLightTheme={isLightTheme} />} */}
		</div>
	);
})