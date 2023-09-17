import modalStyles from './styles/payModal.module.css'

export const BuyBtn = ({totalPrice, isActive}) => {
	return(
		<button style={{opacity: isActive ? "100%" : '50%' }} className={modalStyles.buyBtn}>
				<span className={modalStyles.buyBtnTxt}>
					Приобрести сейчас:
				</span>
				<span className={modalStyles.totalPriceTxt}>
				{`${totalPrice} ₽`}
				</span>
		</button>
	)
}