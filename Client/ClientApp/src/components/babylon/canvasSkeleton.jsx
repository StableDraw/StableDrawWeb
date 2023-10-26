import sceneClass from './stylesDark/scene.module.css'
import mainClass from './stylesLight/main.module.css'



export const CanvasSkeleton = () => {


	return (
		<div className={mainClass.sceneBox}>
			<div className={sceneClass.canvasSkeleton}>

			</div>
		</div>
	);
}