import React from 'react'
import cl from './NeuralCard.module.css'
import { Tooltip } from '@mui/material'
const NeuralCard = ({serverName, clientName, description, active, getParams, setNeuralName}) => {
  
  const test = () => {
    active(true)
    setNeuralName(serverName[0])
    getParams(serverName)
  }
  return (
    <Tooltip title={description} placement='right'>
        <div className={cl.item} onClick={test}>
            <div className={cl.itemImg}></div>
            <span className={cl.itemText}>{clientName}</span>
        </div>
      </Tooltip>

  )
}

export default NeuralCard