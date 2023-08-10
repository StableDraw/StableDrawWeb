import React, {useState} from 'react';
import cl from "./PayBtn.module.css";
import AccountCircle from '@mui/icons-material/AccountCircle';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

const Text = () => {

    return (
        <div className={cl.contentText}> 
           <header>
                <div className={cl.header}>
                    <div className={cl.png}> <AccountCircle color="primary" sx={{ fontSize: 40 }}/> </div>
                    <div className={cl.headerText}> Персональный </div> 
                </div>

                <div className={cl.points}> <AllInclusiveIcon color="primary" sx={{ fontSize: 30 }}/> </div>
           </header>
        </div>
    );
};

export default Text;