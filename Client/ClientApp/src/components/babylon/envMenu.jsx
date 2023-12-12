
import { useState } from 'react';
import cl from './stylesDark/envMenu.module.css';

const envMapsTest = [
	{ id: 1, name: "whiteSky", data: "/babylon/envMaps/WhiteSky.env", preview: '/babylon/envMapsPreviews/WhiteSky.png' },
	{ id: 2, name: "spreeBank", data: "/babylon/envMaps/spreeBank.env", preview: '/babylon/envMapsPreviews/spree_bank_4k.png' },
	{ id: 3, name: "sunSet", data: "/babylon/envMaps/sunSet.env", preview: '/babylon/envMapsPreviews/sunSet.png' }
]
export const EnvMenu = ({ setEnvMap, envMaps }) => {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<div
			// чтобы работал onBlur
			tabIndex='0'
			className={`${cl.main} ${isOpened ? cl.main__open : ''}`}
			onClick={() => setIsOpened(true)}
			onBlur={() => setIsOpened(false)}>
			{!isOpened && <img src="/babylon UI/light.svg" alt="" />}
			{
			isOpened && envMaps.map((envMap, i )=> {
				return (
				<div onClick={() => setEnvMap(envMapsTest.data)} key={i} className={cl.main__envMap}>
					<img className={cl.main__envImg} src={envMap.preview} alt="" />
				</div>)
			})
			}
		</div>
	)
}