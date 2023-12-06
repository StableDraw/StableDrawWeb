import styles from '../styles/personCard.module.css'
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ApplicationPaths } from '../../../api-authorization/ApiAuthorizationConstants'
import { useEffect, useState } from 'react';
import api from '../../../../api/ApiToken'


export const PersonCard = () => {
	const [user, setUser] = useState('');

	useEffect(() => {
		const setUserName = async () => {
			const user = await api.getUserName();
			if (user)
				setUser(user);
		}
		setUserName()
	}, []);

	return (
		<div className={styles.card}>
			<div className={styles.photo}>

			</div>
			<div className={styles.nameBlock}>
				<span className={styles.nameTxt}>
					{user}
				</span>
				<span className={styles.statusTxt}>
					Владелец
				</span>
			</div>
			<div className={styles.btns}>
				<NavLink state={{ local: true }} to={`${ApplicationPaths.LogOut}`} tag={Link} className={styles.btns__logOutBtn}>
					<img src="./userProfile/logOut.svg" alt="" />
				</NavLink>
				<NavLink to={`${ApplicationPaths.Profile}`} tag={Link} className={styles.btns__logOutBtn}>
					<img src="./userProfile/settings.svg" alt="" />
				</NavLink>
			</div>
		</div>
	)
}