import styles from '../styles/personCard.module.css'




export const PersonCard = () => {
	return (
		<div className={styles.card}>
			<div className={styles.photo}>

			</div>
			<div className={styles.nameBlock}>
				<span className={styles.nameTxt}>
					Андрей Быков
				</span>
				<span className={styles.statusTxt}>
					Владелец
				</span>
			</div>
			<div className={styles.btns}>
				<button className={styles.btns__logOutBtn}>
					<img src="./userProfile/logOut.svg" alt="" />
				</button>
				<button className={styles.btns__logOutBtn}>
					<img src="./userProfile/settings.svg" alt="" />
				</button>
			</div>
		</div>
	)
}