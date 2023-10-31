import React from 'react'
import cl from './NeuralCard.module.css'
import { Tooltip } from '@mui/material'
import testMob from '../../../../store/neuralWindow.tsx'
import { observer } from 'mobx-react-lite'
const NeuralCard = observer(({serverName, clientName, description, active,}) => {
  const test = () => {
    active(true)
    testMob.getParams(serverName)
  }
  console.log(JSON.parse(JSON.stringify(serverName)))
  const image = `${serverName}.png`
  return (
    <Tooltip title={description} placement='right'>
      <div className={testMob.activeNeuralName === serverName ?  cl.itemActive : cl.item} onClick={test}>
          <div>
            <img src={image} className={cl.itemImg}/>
          </div>
          <span className={cl.itemText}>{clientName}</span>
      </div>
    </Tooltip>

  )
})

export default NeuralCard