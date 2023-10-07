import React from 'react'
import cl from './NeuralCard.module.css'
import { Tooltip } from '@mui/material'
import testMob from '../../../../store/neuralWindow.tsx'
const NeuralCard = ({serverName, clientName, description, active,}) => {
  const test = () => {
    active(true)
    // setNeuralName(serverName[0])
    testMob.getParams(serverName)
    // getParams(serverName)
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