import modalStyles from './styles/payModal.module.css'
import { CheckBox } from './checkBox'

export const Agreement = ({ isActive, setIsActive }) => {
	return (
		<div className={modalStyles.agreement}>
			<div>
				<CheckBox isActive={isActive} setIsActive={setIsActive} />
			</div>
			<span className={modalStyles.agreementTxt}>
				Продолжая оформление заказа, я соглашаюсь с условиями <u>Пользовательского</u> соглашения, включая условия обработки персональных данных
			</span>
		</div>
	)
}