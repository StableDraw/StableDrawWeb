import styles from '../styles/history.module.css'
import { ToggleBtn } from './toggleBtn'

export const History = () => {
	return(
		<div className={styles.main}>
			<span className={styles.historyTxt}>
				История генераций
			</span>
			<ToggleBtn/>
		</div>
	)
}