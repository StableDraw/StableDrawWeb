import cl from './LeftPanel.module.css'
import NeuralCard from '../NeuralCard/NeuralCard'
import api from '../../../../api/apiNeurals'
import { useState, useEffect } from 'react'
import {observer} from 'mobx-react-lite'
const filterNeurals = (searchText, listOfNeurals) => {
    if (!searchText) {
        return listOfNeurals
    }
    return listOfNeurals.filter(neural =>
        neural.toLowerCase().includes(searchText.toLowerCase()) 
    )
}

const LeftPanel = observer(({openParam, setParametrs,setNeuralName, neuralsList}) => {
    const [searchTerm, setSearchTerm] = useState('')
    async function getParams(name) {
        try {
            const data = await api.GetNeurals(name)  
            setParametrs(data.data)
        }
        catch(e) {
            console.error(e)
            throw(e)
        }
    }
    // useEffect(()=> {
    //     const newNeurals = filterNeurals(searchTerm, neuralsList)
    //     // neuralsList = newNeurals
    // },[searchTerm])
  return (
    <section className={cl.finder}>
        <div className={cl.finderBlock}>
            <input
                value={searchTerm}
                type='text'
                placeholder="Поиск режима"
                className={cl.inputFinder}
                onChange={e=>setSearchTerm(e.target.value)}
            >
            </input>
            <div className={cl.list}>
                {neuralsList ? neuralsList.map((neural, id)=>
                    <NeuralCard 
                        key={id} 
                        getParams={getParams}
                        setNeuralName={setNeuralName} 
                        active={openParam}
                        serverName={neural.serverName} 
                        clientName={neural.clientName}
                        description={neural.description}
                    />) :
                    <div>Ошибка в запросе</div> } 
            </div>      
        </div>
    </section>
  )
})

export default LeftPanel