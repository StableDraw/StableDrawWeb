import React from 'react';
import cl from './Pay.module.css';
import Button from '@mui/material/Button';

function Content2() {
  return (
      <div>
          <div className={cl.buy_btn}>
            <Button  variant="contained" disableElevation >       Приобрести сейчас </Button>
          </div>
      </div>
  );
};

export default Content2;