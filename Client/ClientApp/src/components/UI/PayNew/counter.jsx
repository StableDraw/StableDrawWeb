import { useEffect, useState } from 'react'
import SelectorSt from './styles/selector.module.css'


export const Counter = ({isActive, setTotalPrice, totalPrice}) => {
	const [count, setCount] = useState(1);
	const [price, setPrice] = useState(5000);

	useEffect(() => {
		if(isActive)
			setTotalPrice(n=>n + price);
		else{
			if(totalPrice > 49900)
				setTotalPrice(n=>n - price);
		}
			
	}, [isActive])

	const setCountDown = () => {
		if(count > 1)
		{
			setCount(count - 1)
			setPrice(price - 5000)
		}
	}
	const setCountUp = () => {
			setCount(count + 1)
			setPrice(price + 5000)
	}


	return(
		<div className={SelectorSt.counter}>
			<div className={SelectorSt.buttons}>
				<button className = {SelectorSt.button} onClick={setCountDown}>
					<span className={SelectorSt.counterTxt}>
						-
					</span>
				</button>
				<span className={SelectorSt.counterTxt}>
					{count}
				</span>
				<button className = {SelectorSt.button} onClick={setCountUp}>
					<span onClick={setCountDown} className={SelectorSt.counterTxt}>
						+
					</span>
				</button>
			</div>
			<span className={SelectorSt.counterTxt}>
				5000₽
			</span>
		</div>
	)
}