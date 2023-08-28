import React from 'react';
import cl from '../Pay.module.css';
import Button from '@mui/material/Button';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ButtonGroup from '@mui/material/ButtonGroup';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BreadCrumbs from './BreadCrumbs';
import Menu from './BreadCrumbs';


const Head = () => {
  const buttons = [
    <Button key="one">
      <HelpOutlineIcon sx={{ fontSize: 40 }}/> 
    </Button>,

    // <Button key="two">
    //   <LiveHelpIcon  sx={{ fontSize: 40 }}/>
    // </Button>,

    // <Button key="three">
    //   <HelpOutlineIcon sx={{ fontSize: 40 }}/>
    // </Button>,
  ];

  return (
    <div>
        <header className={cl.top_box}>
              <div className={cl.menu_hed}> <Menu/> </div>
              <div className={cl.top_box_btn}>
                <ButtonGroup size="small" aria-label="small button group">
                  {buttons}
                </ButtonGroup>
              </div>
        </header>
    </div>
  )
};

export default Head;