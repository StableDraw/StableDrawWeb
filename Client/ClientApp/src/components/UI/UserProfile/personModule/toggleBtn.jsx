import React from 'react';
import { useState, memo, } from "react";
import styles from '../styles/toggleBtn.module.css'

export const ToggleBtn = memo(({
	leftBtnTxt,
	rightBtnTxt,
	setShowedContent,
}) => {
	const [isLeftBtn, setIsLeftBtn] = useState(true);

	const showLeftBtnContent = () => {
		if (isLeftBtn)
			return;

		setIsLeftBtn(true);
		setShowedContent(false);
	}

	const showRightBtnContent = () => {
		if (!isLeftBtn)
			return;

		setIsLeftBtn(false);
		setShowedContent(true);
	}

	return (
		<div className={styles.selectButtons}>
			<button
				onClick={showLeftBtnContent}
				className={isLeftBtn ? styles.selectedBtnLeft : styles.btnLeft}>
				<span className={isLeftBtn ? styles.selectedTxt : styles.txt}>
					{leftBtnTxt}
				</span>
			</button>
			<button
				onClick={showRightBtnContent}
				className={isLeftBtn ? styles.btnRight : styles.selectedBtnRight}>
				<span className={isLeftBtn ? styles.txt : styles.selectedTxt}>
					{rightBtnTxt}
				</span>
			</button>
		</div>
	);
})