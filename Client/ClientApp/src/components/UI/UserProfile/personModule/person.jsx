import styles from '../styles/personCard.module.css'
import { History } from "./history"
import { PersonCard } from "./personCard"



export const Person = () => {
	return (
		<div className={styles.main}>
			<PersonCard />
			<History/>
		</div>
	)
}