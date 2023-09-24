import { useState } from "react";
import headerClasses from './stylesLight/appBar.module.css';
import { HeaderMenu } from "./headerMenu";
import { ThemeToggle } from "./themeToggle";

export const HeaderBtn = ({isLightTheme, setTheme}) => {
	const [isVisible, setIsVisible] = useState(false);

	return(
		<div className={headerClasses.btns}>
			<ThemeToggle isLightTheme={isLightTheme} setTheme={setTheme}/>
		<button className={headerClasses.menuBtn } onClick={() => setIsVisible(!isVisible)}>
				<svg xmlns="http://www.w3.org/2000/svg" width="44" height="24" viewBox="0 0 44 24" fill="none">
					<path d="M42 22L2 22" stroke={isLightTheme ? "#656565" : "white"} stroke-width="4" stroke-linecap="round" />
					<path d="M42 12L2 12"stroke={isLightTheme ? "#656565" : "white"} stroke-width="4" stroke-linecap="round" />
					<path d="M42 2L2 2" stroke={isLightTheme ? "#656565" : "white"} stroke-width="4" stroke-linecap="round" />
				</svg>
		</button>
		{isVisible && <HeaderMenu isLightTheme={isLightTheme} setIsVisible={setIsVisible}/>}
		</div>
		
	);
};