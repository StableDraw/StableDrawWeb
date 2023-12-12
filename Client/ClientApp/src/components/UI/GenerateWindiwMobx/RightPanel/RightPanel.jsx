import cl from './RightPanel.module.css'

import Parametrs from '../parametrs/Parametrs/Parametrs'
const RightPanel = ({ closeWindow, showParam, closeParam, }) => {

	return (
		<section className={cl.mainContent}>
			<div className={cl.mainContent2}>
				<Parametrs closeParam={closeParam} closeWindow={closeWindow} />
			</div>
		</section>
	)
}

export default RightPanel