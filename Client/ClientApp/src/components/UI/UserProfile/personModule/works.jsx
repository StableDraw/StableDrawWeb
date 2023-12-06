import styles from '../styles/works.module.css'


export const Works = ({ works }) => {
	return (
		<div className={styles.main}>
			{works.map((work) =>
				<div className={styles.card} key={`${work.id}1`}>
					<img className={styles.card__img} src={work.img} alt="" key={`${work.id}2`} />
					<span className={styles.txt} key={`${work.id}3`}>
						{`${work.saveTime} часа назад`}
					</span>
					<button className={styles.share} key={`${work.id}4`}>
						<img src="/userProfile/share.svg" alt="" key={`${work.id}5`} />
					</button>
				</div>)}
		</div>
	)
}