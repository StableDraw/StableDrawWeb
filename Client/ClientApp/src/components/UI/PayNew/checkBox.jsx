import { useState } from 'react'
import SelectorSt from './styles/selector.module.css'

export const CheckBox = ({setIsActive, isActive}) => {

	return (
		<button onClick={() => setIsActive(!isActive)} className={SelectorSt.checkBox}>
			{isActive && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
				<rect width="30" height="30" rx="5" fill="#1975D2" />
				<path d="M26 9.31987C26 9.70146 25.8735 10.0258 25.6206 10.2929L15.8116 20.6532L13.969 22.5993C13.7161 22.8664 13.409 23 13.0477 23C12.6865 23 12.3794 22.8664 12.1265 22.5993L10.2839 20.6532L5.37935 15.4731C5.12645 15.2059 5 14.8816 5 14.5C5 14.1184 5.12645 13.7941 5.37935 13.5269L7.22194 11.5808C7.47484 11.3137 7.78194 11.1801 8.14323 11.1801C8.50452 11.1801 8.81161 11.3137 9.06452 11.5808L13.0477 15.8022L21.9355 6.40067C22.1884 6.13356 22.4955 6 22.8568 6C23.2181 6 23.5252 6.13356 23.7781 6.40067L25.6206 8.3468C25.8735 8.61392 26 8.93827 26 9.31987Z" fill="white" />
			</svg>}
		</button>
	)

}
