import React, {Component, useState} from 'react';
import cl from "./BabylonBtn.module.css";
import {Box, createTheme, ThemeProvider} from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Text1 from './Text1';



const Content1 = () => {
    const { palette } = createTheme();
    const { augmentColor } = palette;
    const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
    const theme = createTheme({
        palette: {
            apple: createColor('#6E0EBA'),
        },
    });
    return (
        <div className={cl.contentBox}>
            <Text1/>
            <div className={cl.BabylonBtn}>
                <Box display="flex" justifyContent="center">
                    <Link to="/babylon">
                        <Button variant="contained" disableElevation >
                            Попробовать Babylon
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

export default Content1;