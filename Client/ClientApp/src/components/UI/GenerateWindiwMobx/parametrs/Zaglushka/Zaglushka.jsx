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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="12"
                                    viewBox="0 0 16 12"
                                    fill="none"
                                >
                                    <path
                                        d="M8 12L15.7942 0.75H0.205771L8 12Z"
                                        fill="#ACACAC"
                                    />
                                </svg>
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