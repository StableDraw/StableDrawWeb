import React from "react";
import './StartPage.css';
import Button from '@mui/material/Button';
import { Container, Toolbar, AppBar, Typography, Grid, colors } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';


const StartPage = () => {
    return (
            <div className="image">
                <header className="header">
                    <div className="headerBlock">
                        <img src={"./Subtract.png"} />
                        <Typography>  STABLE DRAW   </Typography>
                    </div>
                    <div className="headerBlock">
                        <Button color="inherit" outlined="contained">Регистрация</Button>
                        <Button color="inherit" outlined="contained">Вход</Button>
                    </div>
                </header>

                <content className="content">
                    <header className="contentText">
                        <div>
                            <header className="headerContentText"> STABLE DRAW </header>
                            <div>
                                <div>Веб-платформа для рисования,</div>
                                <div>обработки изображений и создания</div>
                                <div>анимаций с применением </div>
                                <div>искусственных нейронных сетей</div>
                            </div>
                        </div>
                    </header>

                    <div className="contentBtn">
                        <NavLink tag={Link} to="/drawing-to-img">
                            <Box sx={{'& > :not(style)': {width: 250, height: 100, borderRadius: 5,
                                        color: '#000',
                                        backgroundColor: '#FFFFFF',
                                        fontSize: 32},}}> 
                                <Button variant="contained" >Начать</Button> 
                            </Box>              
                        </NavLink>
                        
                        <NavLink tag={Link} to="/test">
                            <Box sx={{'& > :not(style)': {
                                        width: 300,
                                        height: 100,
                                        borderRadius: 5,
                                        color: '#FFFFFF',
                                        fontSize: 32,
                                        marginLeft: 3.75,
                                        backgroundColor: '#000',
                                        opacity: '60%',
                                    },
                                    }}> 
                                <Button  variant="outlined" color="inherit">Бета-версия</Button>
                            </Box>
                        </NavLink>
                    </div>
                </content>

                {/* <footer className="footer"> <a href="https://vk.com/stabledraw"> <img src={"./вк.png"} /> </a></footer> */}
        </div>
    );
}
export default StartPage;


