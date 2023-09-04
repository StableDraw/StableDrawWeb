import React, {useState} from 'react';
import cl from "../PayBtn.module.css";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AirplayIcon from '@mui/icons-material/Airplay';
import {Box} from '@mui/material';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

const Text = () => {
    return (
           <div>
                <div className={cl.points}>
                    <div>
                        <AirplayIcon
                            color="primary"
                            sx={{ fontSize: 30 }}
                        />
                    </div>
                    <div className={cl.text_in_point}> Дополнительные участники: +5000 рублей каждый. </div>
                </div>

                <div className={cl.points}>
                    <div>
                        <AccountBalanceWalletIcon
                            color="primary"
                            sx={{ fontSize: 30 }}
                        />
                    </div>
                    <div className={cl.text_in_point}> При приобретении первого месяца подписки- 3 бесплатные 3D модели. </div>
                </div>
                <div className={cl.points}>
                    <div>
                        <AllInclusiveIcon
                            color="primary"
                            sx={{ fontSize: 30 }}
                        />
                    </div>
                    <div className={cl.text_in_point}> Дополнительные 3D модели: +5000 рублей за штуку.</div>
                </div>
           </div>
    );
};

export default Text;