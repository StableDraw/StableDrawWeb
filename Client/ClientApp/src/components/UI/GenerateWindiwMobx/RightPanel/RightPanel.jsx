import cl from './RightPanel.module.css'

import Zaglushka from '../parametrs/Zaglushka/Zaglushka'
import Parametrs from '../parametrs/Parametrs/Parametrs'
const RightPanel = ({ closeWindow, showParam, closeParam, }) => {

	return (
		<section className={cl.mainContent}>
			<div className={cl.mainContent2}>
				{showParam ? <Parametrs closeParam={closeParam} closeWindow={closeWindow} /> : <Zaglushka />}
			</div>
		</section>
	)
}

export default RightPanel