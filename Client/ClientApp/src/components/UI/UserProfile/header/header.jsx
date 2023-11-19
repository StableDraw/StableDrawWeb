import styles from '../styles/header.module.css'
import { Logo } from './logo';
import { ApplicationPaths } from '../../../api-authorization/ApiAuthorizationConstants'
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export const Header = () => {
	return (
		<div className={styles.main}>
			<Logo />
			<NavLink state={{ local: true }} tag={Link} className={styles.link} to={`${ApplicationPaths.LogOut}`}>
				<span className={styles.main__txt}>
					Выход
				</span>
			</NavLink>
		</div>
	)
}