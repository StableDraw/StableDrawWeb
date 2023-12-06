import React from 'react'
import cl from './Zaglushka.module.css'

const Zaglushka = () => {
	return (
		<div className={cl.container}>

			<ol className={cl.list}>
				<li className={cl.item}>
					<img
						className={cl.image}
						src={"1st.png"}
						alt={"1st"}
					/>
					Выберите <span className={cl.blueitem}>режим</span> в поисковой строке слева.
				</li>

				<li className={cl.item}>
					<img
						className={cl.image}
						src={"2nd.png"}
						alt={"2nd"}
					/>
					Настройте
					<span className={cl.dropdown}>
						параметры
					</span>
				</li>

				<li className={cl.item}>
					<img
						className={cl.image}
						src={"3rd.png"}
						alt={"3rd"}
					/>
					Нажмите <span className={cl.gradientitem}>сгенерировать</span>.
				</li>
			</ol>
		</div>
	)
}

export default Zaglushka