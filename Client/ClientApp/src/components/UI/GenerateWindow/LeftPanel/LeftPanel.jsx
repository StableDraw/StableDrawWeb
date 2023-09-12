import cl from './LeftPanel.module.css'
import NeuralCard from '../NeuralCard/NeuralCard'
const LeftPanel = ({openParam, setNeuralType}) => {
    const neurals = ['Апскейл', 'Генерация по тексту', 'Генерация по описанию', 'Апскейл', 'Генерация по тексту', 'Генерация по описанию']
  return (
    <section className={cl.finder}>
        <div className={cl.finderBlock}>
            <input 
                type='text'
                placeholder="Поиск режима"
                className={cl.inputFinder}
            >
            </input>
            <img className={cl.magnifer} src='Magnifier.svg'/>
            <div className={cl.list}>
                {neurals.map((neural, id)=><NeuralCard key={id} setNeuralType={setNeuralType} active={openParam} name={neural}/> )} 
            </div>      
        </div>
    </section>
  )
}

export default LeftPanel