import { useEffect, useState } from 'react';
import { Logo } from './logo';
import header from './styles/header.module.css'
import { Link, } from 'react-router-dom';
import api from '../../../api/ApiToken'
import { ApplicationPaths } from '../../api-authorization/ApiAuthorizationConstants'
import { NavLink } from 'reactstrap';


export const Header = () => {
	const [token, setToken] = useState(false);
	const [user, setUser] = useState('');

	useEffect(() => {
		const setTokenId = async () => {
			const userToken = await api.token();
			setToken(userToken);
		}

		const setUserName = async () => {
			const user = await api.getUserName();
			if (user)
				setUser(user);
		}

		setUserName();
		setTokenId();
	}, []);

	return (
		<header className={header.main}>
			<Logo />
			{
				!token ? <div className={header.registration}>
					<NavLink tag={Link} className={header.link} to={`${ApplicationPaths.Register}`}>
						<span className={header.txt}> Регистрация </span>
					</NavLink>
					<NavLink tag={Link} className={header.link} to={`${ApplicationPaths.Login}`}>
						<span className={header.txt}> Вход </span>
					</NavLink>

				</div> :
					<div className={header.registration}>
						<NavLink tag={Link} className={header.link} to={`${ApplicationPaths.Profile}`}>
							<span className={header.txt}>
								{user}
							</span>
						</NavLink>
						<NavLink tag={Link} state={{ local: true }} className={header.link} to={`${ApplicationPaths.LogOut}`}>
							<span className={header.txt}> Выход </span>
						</NavLink>
					</div>
			}
			{/* <button onClick={() => { setIsVisible(!isVisible) }} className={header.menuBtn}>
				<svg xmlns="http://www.w3.org/2000/svg" width="44" height="24" viewBox="0 0 44 24" fill="none">
					<path d="M42 22L2 22" stroke="white" strokeWidth="4" strokeLinecap="round" />
					<path d="M42 12L2 12" stroke="white" strokeWidth="4" strokeLinecap="round" />
					<path d="M42 2L2 2" stroke="white" strokeWidth="4" strokeLinecap="round" />
				</svg>
			</button>
			{isVisible && <HeaderMenu setIsVisible={setIsVisible} />} */}
		</header>
	)
}
