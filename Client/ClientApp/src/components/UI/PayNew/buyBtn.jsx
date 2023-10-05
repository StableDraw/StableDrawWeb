import { useState } from 'react'
import modalStyles from './styles/payModal.module.css'

export const BuyBtn = ({ totalPrice, isActive }) => {
	const [attention, isAttention] = useState(false);
	const showAttention = () => {
		if (!isActive)
			isAttention(true);
	};

	return (
		<>
			<button
				onClick={showAttention}
				style={{ opacity: isActive ? "100%" : '50%' }}
				className={modalStyles.buyBtn}>
				<span className={modalStyles.buyBtnTxt}>
					Приобрести сейчас:
				</span>
				<span className={modalStyles.totalPriceTxt}>
					{`${totalPrice} ₽`}
				</span>
			</button>
			{attention && !isActive &&
				<div className={modalStyles.attention}>
					<span className={modalStyles.attentionTxt}>
						*нужно написать что - то типа нажмите галочку, пжлста
					</span>
				</div>
			}
		</>
	)
}