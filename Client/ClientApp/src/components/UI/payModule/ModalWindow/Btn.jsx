import React, {useState} from 'react';
import cl from "../PayBtn.module.css";
import Button from '@mui/material/Button';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import Agreement from '../../../../order/pay-sayte/content/Agreement';
const Btn = () => {
    const [checked, setChecked] = React.useState(true);
    const handleChange = () => {
        setChecked(!checked);
    }
    return (
        <div className={cl.buyBtn}>
            <CurrencyRubleIcon color="primary" sx={{ fontSize: 30 }}/>
            <Button disabled={checked} variant="contained" disableElevation > Приобрести сейчас </Button>
            <Agreement checked = {!checked} handleChange = {handleChange}/>
        </div>
    );
};
export default Btn;