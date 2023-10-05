import headerLight from './stylesLight/appBar.module.css';
import header from './stylesDark/appBar.module.css';
import { Logo } from "./logo";
import { HeaderBtn } from "./headerBtn";

export const Header = ({ setTheme, isLightTheme }) => {


	return (
		<header className={isLightTheme ?  headerLight.header : header.header}>
			<Logo isLightTheme={isLightTheme}/>
			<HeaderBtn isLightTheme = {isLightTheme} setTheme = {setTheme}/>
		</header>
	)
}