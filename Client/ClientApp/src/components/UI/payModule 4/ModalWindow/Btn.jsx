import React, {useState} from 'react';
import cl from "../PayBtn.module.css";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import {Box} from '@mui/material';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import Agreement from '../../../../order/pay-sayte/content/Agreement';


const Btn = (props) => {
const [checked, setChecked] = React.useState(true);
function handleChange() {
  setChecked(!checked);
};

    return (
        <div className={cl.buyBtn}> 
          <Button disabled={checked} variant="contained" style={{maxWidth: '80%', minWidth: '80%'}} sx={{ fontSize: 20}}> 
            Приобрести сейчас: 
           <div>{props.sum} <CurrencyRubleIcon/></div> 
          </Button>
        <Agreement checked = {!checked} handleChange = {handleChange}/>
        </div>
    );
};

export default Btn;