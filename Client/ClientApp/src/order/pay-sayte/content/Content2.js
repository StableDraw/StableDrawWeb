import React from 'react';
import cl from '../Pay.module.css';
import Button from '@mui/material/Button';
import CheckList from './Checklist';
import Agreement from './Agreement';

function Content2() {

const [checked, setChecked] = React.useState(true);

function handleChange() {
  setChecked(!checked);
};

  return (
      <div className={cl.content_box2}>
          <CheckList/>
          <Button disabled={checked} variant="contained" disableElevation > Приобрести сейчас </Button>
          <Agreement checked = {!checked} handleChange = {handleChange}/>
      </div>
  );
};

export default Content2;