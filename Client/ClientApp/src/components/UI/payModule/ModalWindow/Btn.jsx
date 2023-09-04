import React from 'react';
import cl from "../PayBtn.module.css";
import Button from '@mui/material/Button';
import Agreement from '../../../../order/pay-sayte/content/Agreement';


const Btn = () => {
    const [checked, setChecked] = React.useState(true);
    const handleChange = () => {
      setChecked(!checked);
    };

    return (
        <div className={cl.buyBtn}> 
        {/* <CurrencyRubleIcon color="primary" sx={{ fontSize: 30 }}/> */}
        <Button
            disabled={checked}
            variant="contained"
            disableElevation
            sx={{ fontSize: 20 }}
        >
            Приобрести сейчас
        </Button>
        <Agreement checked = {!checked} handleChange = {handleChange}/>
        </div>
    );
};

export default Btn;