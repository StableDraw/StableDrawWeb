
import { Logo } from './logo';
import header from './styles/header.module.css'

export const Header = () => {
	return (
		<header className={header.main}>
			<Logo />
			<button className={header.menuBtn}>
				<svg xmlns="http://www.w3.org/2000/svg" width="44" height="24" viewBox="0 0 44 24" fill="none">
					<path d="M42 22L2 22" stroke="white" stroke-width="4" stroke-linecap="round" />
					<path d="M42 12L2 12" stroke="white" stroke-width="4" stroke-linecap="round" />
					<path d="M42 2L2 2" stroke="white" stroke-width="4" stroke-linecap="round" />
				</svg>
			</button>
		</header>
	)
};
