import React from 'react';
import cl from '../Pay.module.css';
import Button from '@mui/material/Button';
import CheckList from './Checklist';
import Agreement from './Agreement';
import { cyan } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

function Content2() {
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(cyan[500]),
    backgroundColor: cyan[500],
    '&:hover': {
      backgroundColor: cyan[700],
    },
  }));

const [checked, setChecked] = React.useState(true);

function handleChange() {
  setChecked(!checked);
};

  return (
      <div className={cl.content_box2}>
          <CheckList/>
          <ColorButton className={cl.check} disabled={checked} variant="contained" size='large'> Приобрести сейчас </ColorButton>
          <Agreement checked = {!checked} handleChange = {handleChange}/>
      </div>
  );
};

export default Content2;