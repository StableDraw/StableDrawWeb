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
		<div className={styles.btnsCont}>
			<button
				onClick={showLeftBtnContent}
				className={`${styles.btn} ${styles.btn__left} ${isLeftBtn ? styles.btn__selected : styles.btn__unselected}`}>
				<span className={`${styles.txt} ${isLeftBtn ? styles.txt__selected : styles.txt__unselected}`}>
					{leftBtnTxt}
				</span>
			</button>
			<button
				onClick={showRightBtnContent}
				className={`${styles.btn} ${styles.btn__right} ${isLeftBtn ? styles.btn__unselected : styles.btn__selected}`}>
				<span className={`${styles.txt} ${isLeftBtn ? styles.txt__unselected : styles.txt__selected}`}>
					{rightBtnTxt}
				</span>
			</button>
		</div>
	);
})