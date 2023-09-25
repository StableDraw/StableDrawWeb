import cl from './LeftPanel.module.css'
import NeuralCard from '../NeuralCard/NeuralCard'
import api from '../../../../api/apiNeurals'

const LeftPanel = ({openParam, setNeuralType}) => {
    const neurals = ['Апскейл', 'Генерация по тексту', 'Генерация по описанию', 'Апскейл', 'Генерация по тексту', 'Генерация по описанию']
    async function getParams(name) {
        try {
            const data = await api.GetNeurals(name)
            console.log(data.data)
            const result = JSON.parse(data.data)
            console.log(result)
        }
        catch(e) {
            console.error(e)
            throw(e)
        }
    }
  return (
    <section className={cl.finder}>
        <div className={cl.finderBlock}>
            <input 
                type='text'
                placeholder="Поиск режима"
                className={cl.inputFinder}
            >
            </input>
            <div className={cl.list}>
                {neurals.map((neural, id)=><NeuralCard key={id} getParams={getParams} setNeuralType={setNeuralType} active={openParam} name={neural}/> )} 
            </div>      
        </div>
    </section>
  )
}

export default LeftPanel