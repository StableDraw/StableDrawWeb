import cl from './RightPanel.module.css'

import Zaglushka from '../parametrs/Zaglushka/Zaglushka'
import Parametrs from '../parametrs/Parametrs/Parametrs'
const RightPanel = ({closeWindow, showParam, closeParam, neuralType}) => {

  return (
    <section className={cl.mainContent}>
        <div className={cl.mainContent2}>
            <div className={cl.image}>
                <img src='kitty.png'/>
            </div>
            {showParam ? <Parametrs neuralType={neuralType} closeParam={closeParam} closeWindow={closeWindow}/> : <Zaglushka/>}
        </div>
    </section>
  )
}

export default RightPanel