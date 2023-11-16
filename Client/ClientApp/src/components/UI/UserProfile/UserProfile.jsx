import styles from './styles/main.module.css'
import { Header } from './header/header'
import { Person } from './personModule/person'
import { Team } from './team/team'

export const UserProfile = () => {
	return(
		<div className={styles.main}>
			<Header/>
			<div className={styles.main__content}>
				<Person/>
				<Team/>
			</div>
		</div>
	)
}