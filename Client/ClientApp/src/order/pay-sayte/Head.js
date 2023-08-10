import React from 'react';
import cl from './Pay.module.css';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Head = () => {
  return (
      <header className={cl.top_box}>
        <div className={cl.right_btns}>
            <Button>?</Button>
            <Button>?</Button>
            <Button>?</Button>
        </div>
      </header>
  )
};

export default Head;