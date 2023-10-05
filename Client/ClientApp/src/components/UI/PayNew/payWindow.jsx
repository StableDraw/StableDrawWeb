import modalStyles from './styles/payModal.module.css'
import { ModalTop } from './Top'
import { Selector } from './selector';
import { BuyBtn } from './buyBtn'
import { Agreement } from './agreement';
import { useState } from 'react';

export const PayModal = () => {
	const [totalPrice, setTotalPrice] = useState(49900);
	const [isActive, setIsActive] = useState(false);
	return (
		<div className={modalStyles.modal}>
			<ModalTop />
			<div className={modalStyles.topic1}>
				<span className={modalStyles.topicTxt}>
					Уникальная подписка для корпоративных клиентов!
				</span>
			</div>
			<Selector setTotalPrice={setTotalPrice} totalPrice={totalPrice}>
				Дополнительный участник
			</Selector>
			<Selector setTotalPrice={setTotalPrice} totalPrice={totalPrice}>
				Дополнительные 3D модели
			</Selector>
			<Selector setTotalPrice={setTotalPrice} totalPrice={totalPrice}>
				Загрузка собственных 3D моделей
			</Selector>
			<div className={modalStyles.topic2}>
				<span className={modalStyles.topicTxt}>
					При покупке 1 месяца + 3 бесплатных 3D модели
				</span>
			</div>
			<BuyBtn isActive={isActive} totalPrice={totalPrice} />
			<Agreement isActive={isActive} setIsActive={setIsActive} />
		</div>
	)
};