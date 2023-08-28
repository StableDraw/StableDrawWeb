import React, {Component, useState} from 'react';
import cl from "./GenerateButton.module.css";
import {Box, createTheme, ThemeProvider} from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import GenerateText from './GenerateText';



const GenerateContent = () => {

    return (
        <div className={cl.contentBox}>
            <GenerateText/>
            <div className={cl.GenerateBtn}>
                <Box display="block" justifyContent="center">
                    <Link to="/babylon">
                        <Button sx={{background: "#4d1517"}} variant="contained" disableElevation >
                            Параметры
                        </Button>
                    </Link>
                </Box>
            </div>
            <div className={cl.GenerateBtn1}>
                <Box display="block" justifyContent="center">
                    <Link to="/babylon">
                        <Button sx={{background: "#4d1517"}} variant="contained" disableElevation >
                            Text2Image
                        </Button>
                    </Link>
                </Box>
            </div>
            <div className={cl.GenerateBtn2}>
                <Box display="block" justifyContent="center">
                    <Link to="/babylon">
                        <Button sx={{background: "#D3D3D3"}} variant="contained" disableElevation >
                            Отмена
                        </Button>
                    </Link>
                </Box>
            </div>

            {/*<div className={cl.BabylonBtn1}>*/}
            {/*    <Box display="flex" justifyContent="center">*/}
            {/*        <Link to="https://github.com/BabylonJS/Babylon.js">*/}
            {/*            <ThemeProvider theme={theme}>*/}
            {/*                <Button color="apple" variant="contained" disableElevation >*/}

            {/*                    <img src={'github_logo.png'} alt={"github_icon"} style={{ fontSize: 20, height: 25 }}/>*/}
            {/*                    Import Babylon to your project*/}
            {/*                </Button>*/}
            {/*            </ThemeProvider>*/}
            {/*        </Link>*/}
            {/*    </Box>*/}
            {/*</div>*/}


        </div>
    );
};

export default GenerateContent;