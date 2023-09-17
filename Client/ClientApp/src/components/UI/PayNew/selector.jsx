
import SelectorSt from './styles/selector.module.css'
import { CheckBox } from './checkBox'
import { Counter } from './counter'
import { useState } from 'react'

export const Selector = ({children, setTotalPrice, totalPrice}) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className={SelectorSt.selectors}>
			<div className={SelectorSt.selector}>
				<div className={SelectorSt.checkPrt}>
					<CheckBox isActive = {isActive} setIsActive = {setIsActive}/>
					<span className={SelectorSt.checkPrtTxt}>
						{children}
					</span>
				</div>
				<div className={SelectorSt.countPrt}>
					<Counter isActive = {isActive} setTotalPrice = {setTotalPrice} totalPrice = {totalPrice}/>
				</div>
			</div>
		</div>
	)
}