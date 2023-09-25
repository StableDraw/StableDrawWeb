import barClasses from './stylesDark/bar.module.css'
import barClassesLight from './stylesLight/bar.module.css'
import sizeBarLight from './stylesLight/sizeBar.module.css'
import sizeBar from './stylesDark/sizeBar.module.css'


export const SceneCard = ({
	name,
	img,
	scene,
	changeScene,
	setSceneModal,
	isLightTheme, 
}) => {
	const SetScene = () => {
		changeScene(scene);
		setSceneModal(name);
	};
	return (
		<div >
			<div className={ isLightTheme ? sizeBarLight.modelCard : sizeBar.modelCard}>
				<div className={ isLightTheme ? sizeBarLight.dark : sizeBar.dark}></div>
				<div className={barClassesLight.imgCard}>
					<img
						className={barClassesLight.imgInside}
						src={img}
						alt={name}
					/>
						<span className={isLightTheme ? barClassesLight.text : barClasses.text}>{name}</span>
				</div>
				<div className={isLightTheme ? sizeBarLight.sceneLoad : sizeBar.sceneLoad}>
					<button
						onClick={SetScene}
						className={isLightTheme ? sizeBarLight.loadButton_sizeBar : sizeBar.loadButton_sizeBar}>
						<span className={isLightTheme ? sizeBarLight.text : sizeBar.text}>Загрузить</span>
					</button>
				</div>
			</div>
		</div>
	);
};