import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import {Box} from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import cl from "../PayBtn.module.css";
import Text from './Text';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Btn from './Btn';


const Content = () => {

    return (
        <div className={cl.contentBox}> 
           <div className={cl.contentText}> 
           <header>
                <div className={cl.points}>
                    <div> <AccountCircle color="primary" sx={{ fontSize: 40 }}/> </div>
                    <div className={cl.headerText}> Персональный </div> 
                </div>
                <Text/>
                <Btn/>
           </header>
        </div>
    </div>
    );
};

export default Content;