import React, {useState} from 'react';
import cl from "../PayBtn.module.css";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AirplayIcon from '@mui/icons-material/Airplay';
import {Checkbox} from '@mui/material';
import {Box} from '@mui/material';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import ChangePrice from './ChangePrice';


const Text = (props) => {
    return (
           <div className={cl.TextInContent}>
                {/* <div className={cl.firstpoints}>
                    <Checkbox checked={props.checksum0} onChange={props.addSum0}/>
                    <div className={cl.text_in_point}> Основная подписка</div>
                </div> */}
                <div className={cl.points}>
                    <Checkbox checked={props.checksum1} onChange={props.addSum1}/>
                    <div className={cl.text_in_point}> Дополнительный участник</div>
                    <ChangePrice sum = {props.sum} setSum = {props.setSum} checksum={props.checksum1}/>
                </div>

                <div className={cl.points}>
                    <Checkbox checked={props.checksum2} onChange={props.addSum2}/>
                    <div className={cl.text_in_point}> Доболнительные 3D модели</div>
                    <ChangePrice sum = {props.sum} setSum = {props.setSum} checksum={props.checksum2}/>
                </div>
                <div className={cl.points}>
                    <Checkbox checked={props.checksum3} onChange={props.addSum3}/>
                    <div className={cl.text_in_point}> Загрузка собственных 3D моделей</div>
                    <ChangePrice sum = {props.sum} setSum = {props.setSum} checksum={props.checksum3}/>
                </div>
           </div>
    );
};

export default Text;