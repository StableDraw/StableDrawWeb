import modalStyles from './styles/payModal.module.css'
import { Premium } from './premium'
import {BasePrice} from './basePrice';

export const ModalTop = () => {
	return (
		<div className={modalStyles.modalTop}>
			<Premium/>
			<BasePrice/>
		</div>
	)
}