import React from 'react'
import cl from './NeuralCard.module.css'
const NeuralCard = ({name, active,getParams,setNeuralName}) => {
  const test = () => {
    active(true)
    setNeuralName(name)
    getParams(name)
  }
  return (
    <div className={cl.item} onClick={test}>
        <div className={cl.itemImg}></div>
        <span className={cl.itemText}>{name}</span>
    </div>
  )
}

export default NeuralCard