import React from 'react'
import cl from './Zaglushka.module.css'
const Zaglushka = () => {
  return (
    <div className={cl.container}>
        <ol className={cl.list}>
            <li className={cl.item}>Выберите режим в поисковой строке слева.</li>
            <li className={cl.item}>Настройте параметры.</li>
            <li className={cl.item}>Нажмите “сгенерировать”.</li>
        </ol>
    </div>
  )
}

export default Zaglushka