import styles from '../styles/team.module.css';

const team = [
	{ name: 'Вася Пупкин', profession: 'Дизайнер', tg: 'soko.love', id: 'HFwej222' },
	{ name: 'Вася Пупкин', profession: 'Дизайнер', tg: 'soko.love', id: 'GHwefk422' },
	{ name: 'Вася Пупкин', profession: 'Дизайнер', tg: 'soko.love', id: 'HG09ewj22' },
	// { name: 'Вася Пупкин', profession: 'Дизайнер', tg: 'soko.love', id: '231FW' },
	// { name: 'Вася Пупкин', profession: 'Дизайнер', tg: 'soko.love', id: '231FW' },
	// { name: 'Вася Пупкин', profession: 'Дизайнер', tg: 'soko.love', id: '231FW' },
	// { name: 'Вася Пупкин', profession: 'Дизайнер', tg: 'soko.love', id: '231FW' },
	// { name: 'Вася Пупкин', profession: 'Дизайнер', tg: 'soko.love', id: '231FW' },
]


export const Team = () => {
	return (
		<div className={styles.main}>
			<span className={styles.titleTxt}>
				Моя команда
			</span>
			<div className={styles.cardsBlock}>
				{team.map(team => <div className={styles.card} key={`${team.id}1`}>
					<div className={styles.card__photo} key={`${team.id}2`}>
					</div>
					<div className={styles.card__info} key={`${team.id}3`}>
						<span className={styles.name} key={`${team.id}4`}>
							{team.name}
						</span>
						<span className={styles.profession} key={`${team.id}5`}>
							{team.profession}
						</span>
						<div className={styles.tg} key={`${team.id}6`}>
							{team.tg}
							<img className={styles.tg__icon} src="/userProfile/tg.svg" alt="" key={`${team.id}7`} />
						</div>
					</div>
				</div>)}
			</div>
		</div>
	)
}