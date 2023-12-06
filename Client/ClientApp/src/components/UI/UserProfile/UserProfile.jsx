import styles from './styles/main.module.css'
import { Header } from './header/header'
import { Team } from './team/team'
import { History } from "./personModule/history"
import { PersonCard } from "./personModule/personCard"

export const UserProfile = () => {
	return (
		<div className={styles.main}>
			<Header />
			<div className={styles.main__content}>
				<div className={styles.main__person}>
					<PersonCard />
					<History />
				</div>
				<Team />
			</div>
		</div>
	)
}