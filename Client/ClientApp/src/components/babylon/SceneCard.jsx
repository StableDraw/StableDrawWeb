import barClasses from './stylesDark/bar.module.css'
import barClassesLight from './stylesLight/bar.module.css'
import sizeBarStyles from './stylesLight/sizeBar.module.css'


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
			<div className={ isLightTheme ? sizeBarStyles.modelCard : barClasses.modelCard}>
				<div className={ isLightTheme ? sizeBarStyles.dark : barClasses.dark}></div>
				<div className={barClassesLight.imgCard}>
					<img
						className={barClassesLight.imgInside}
						src={img}
						alt={name}
					/>
						<span className={isLightTheme ? barClassesLight.text : barClasses.text}>{name}</span>
				</div>
				<div className={isLightTheme ? sizeBarStyles.sceneLoad : barClasses.sizeBar}>
					<button
						onClick={SetScene}
						className={sizeBarStyles.loadButton_sizeBar}>
						<span className={sizeBarStyles.text}>Загрузить</span>
					</button>
				</div>
			</div>
		</div>
	);
};