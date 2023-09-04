import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import cl from "./LeftPanel.module.scss";
import "./LeftPanel.module.scss";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import Close from "@mui/icons-material/Close";
import {NeuronObject} from "./NeuronObject";
const LeftPanel = ({props}) => {
    const [ros, setRos] = useState()
    const callback = (result) => {
        setRos(result)
    }
    const [modal, setModal] = useState(false)
    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [modal3, setModal3] = useState(false)
    const [modal4, setModal4] = useState(false)
    const [modal5, setModal5] = useState(false)
    const showAdding1Modal = () => {
        setModal(!modal)
    }
    const showAdding2Modal = () => {
        setModal1(!modal1)
    }
    const showAdding3Modal = () => {
        setModal2(!modal2)
    }
    const showAdding4Modal = () => {
        setModal3(!modal3)
    }
    const showAdding5Modal = () => {
        setModal4(!modal4)
    }
    const showAdding6Modal = () => {
        setModal5(!modal5)
    }
    const [searchValue, setSearchValue] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [neurons, setNeurons] = useState([])

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://64ef0132219b3e2873c3c53c.mockapi.io/Neurons`
        )
            .then((res) => res.json())
            .then((json) => {
                setNeurons(json);
                console.log(json);
            })
            .catch((err) => {
                console.warn(err);
                alert("Sorry, you Internet connection isn`t working. Please, restart the page");
            })
            .finally(() => setIsLoading(false));
    }, []);

    const onChanging = (e) => {
        setSearchValue(e.target.value)
        console.log(e)
        console.log(e.target.value)
    }
    // const getNeurons = () => {
    //     axios.get("https://localhost:44404/drawing-to-img")
    //         .then((response)=>{
    //             setNeurons(response.data)
    //         })
    // }
    // useEffect(()=>{
    //     getNeurons()
    // }, [])
    const [activity, setActivety] = useState(false)
    const getActive = () => {
        setActivety(!activity)
    }

    // const getObjectData = (e) => {
    //     console.log(e.target.value)
    // }

    const data = [
        { label: 'Все' },
        { label: 'Многослойные нейронные сети' },
        { label: 'Сверточные нейронные сети' },
        { label: 'Генеративные нейронные сети' },
    ];
    const FireNav = styled(List)({
        '& .MuiListItemIcon-root': {
            minWidth: 0,
            marginRight: 16,
        },
        '& .MuiSvgIcon-root': {
            fontSize: 20,
        },
    });
    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            borderRadius: 0,
            backgroundColor: "#474747",
            position: 'relative',
            // backgroundColor: theme.palette.background.paper,
            border: '1px solid #1976d2',
            fontSize: 16,
            paddingRight: 0,
            padding: '10px 8px 10px 0px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:hover': {
                // borderColor: '#80bdff',
                border: '1px solid #ff826e',
            },
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                paddingRight: 0,
            },
        },
    }));
    return (
        <div className={cl.leftpanel}>
            <div className={cl.agreeWindow}>
                <div className={cl.search_container}>
                    <input
                        type="text"
                        className={cl.search_box}
                        required minLength="1"
                        maxLength="100"
                        size="100"
                        placeholder="Поиск нейронок.."
                        value={searchValue}
                        onChange={onChanging}
                    />
                    <IconButton>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" version="1.1">
                            <title>search</title>
                            <desc>Created with Sketch Beta.</desc>
                            <defs></defs>
                            <g id="Page-1" stroke="none" fill="none">
                                <g id="Icon-Set" transform="translate(-256.000000, -1139.000000)" fill="#ffffff">
                                    <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z" id="search">
                                    </path>
                                </g>
                            </g>
                        </svg>
                    </IconButton>
                    {/* <NativeSelect
                        labelId="demo-customized-select-label"
                        id="demo-customized-select-native"
                        value={age}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                        style={{paddingRight: 0}}
                        className={cl.liststyle}
                        title={
                            <img className="thumbnail-image"
                                 src={"filter.png"}
                                 alt={"filter"}
                                 style={{
                                     width: 20,
                                     height: 20,
                                 }}
                            />
                        }
                    >
                        <option className={cl.option} aria-label="None" value="" style={{fontStyle: 'italic', backgroundColor: "#666666"}}><em>Все</em></option>
                        <option className={cl.option} value={10} style={{backgroundColor: "#666666"}}>Многослойные нейронные сети</option>
                        <option className={cl.option} value={20} style={{backgroundColor: "#666666"}}>Сверточные нейронные сети</option>
                        <option className={cl.option} value={30} style={{backgroundColor: "#666666"}}>Генеративные нейронные сети</option>
                    </NativeSelect> */}
                    <ThemeProvider
                        theme={createTheme({
                            components: {
                                MuiListItemButton: {
                                    defaultProps: {
                                        disableTouchRipple: true,
                                    },
                                },
                            },
                            palette: {
                                mode: 'dark',
                            },
                        })}
                    >
                        <ListItemButton
                            className={cl.filter_btn}
                            sx={{
                                border: 1,
                                maxHeight: 45,
                                minHeight: 45,
                                maxWidth: 36,
                                minWidth: 36,
                                color: '#1976d2',
                                background: "#474747",
                                padding: 0,
                            }}
                            onClick={getActive}
                        >
                            <svg
                                className={cl.Icon_Set}
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                style={{marginLeft: 3}}
                                viewBox="0 0 32 32"
                            >
                                <path d="M12,25l6.67,6.67a1,1,0,0,0,.7.29.91.91,0,0,0,.39-.08,1,1,0,0,0,.61-.92V13.08L31.71,1.71A1,1,0,0,0,31.92.62,1,1,0,0,0,31,0H1A1,1,0,0,0,.08.62,1,1,0,0,0,.29,1.71L11.67,13.08V24.33A1,1,0,0,0,12,25ZM3.41,2H28.59l-10,10a1,1,0,0,0-.3.71V28.59l-4.66-4.67V12.67a1,1,0,0,0-.3-.71Z"/>
                            </svg>
                        </ListItemButton>
                        <Paper elevation={0} sx={{ maxWidth: 190}}>
                            <FireNav
                                component="nav"
                                disablePadding
                                sx={{
                                    background: "#666666",
                                    padding: 0,
                                    right: 192,
                                    top: 45,
                                }}
                            >
                                <Box
                                    sx={{
                                        // background: activity ? '#000000' : null,
                                        padding: 0,
                                        opacity: 0.7,
                                    }}
                                >
                                    {activity &&
                                        data.map((item) => (
                                            <ListItemButton
                                                key={item.label}
                                                sx={{
                                                    minHeight: 32,
                                                    width: 190,
                                                    color: '#ffffff',
                                                    backgroundColor: "#666666",
                                                    '&:hover': {
                                                        backgroundColor: '#888888',
                                                    },
                                                    border: 1,
                                                    borderRadius: 1,
                                                    padding: 0,
                                                }}
                                                onClick={getActive}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        color: 'inherit',
                                                        padding: 0,
                                                    }}
                                                >
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={item.label}
                                                    primaryTypographyProps={{
                                                        fontSize: 16,
                                                        fontWeight: 'medium',
                                                        textAlign: 'center',
                                                    }}
                                                />
                                            </ListItemButton>
                                        ))}
                                </Box>
                            </FireNav>
                        </Paper>
                    </ThemeProvider>
                </div>
                {/*<hr className={cl.hrLine}/>*/}
                {isLoading ? (
                    <h3 style={{color: "#ffffff"}}>Please, wait for the page loading...</h3>
                ) : (
                <div className={cl.Text}>
                    <Button
                        className={cl.adding1}
                        sx={{background: modal ? "#ff0000" : "#ffffff",
                            '&:hover': {
                                backgroundColor: '#ff0000',
                            },}}
                        style={{
                            maxWidth: 150,
                            maxHeight: 150,
                            minWidth: 150,
                            minHeight: 150,
                            marginBottom: 15,
                            marginTop: 2,
                            position: "static",
                        }}
                        variant="contained"
                        onClick={showAdding1Modal}
                        title={'ChatGPT'}
                        disableRipple
                    >
                        <img
                            src={"ChatGPT.jpg"}
                            alt={"ChatGPT"}
                            style={{
                                width: 148,
                                height: 148,
                                borderRadius: 5,
                            }}
                        />
                    </Button>
                    <Button
                        className={cl.adding2}
                        sx={{background: modal1 ? "#ff0000" : "#ffffff",
                            '&:hover': {
                                backgroundColor: '#ff0000',
                            },}}
                        style={{
                            maxWidth: 150,
                            maxHeight: 150,
                            minWidth: 150,
                            minHeight: 150,
                            marginBottom: 15,
                            position: "static",
                        }}
                        variant="contained"
                        onClick={showAdding2Modal}
                        title={'Midjourney'}
                        disableRipple
                    >
                        <img
                            src={"Midjourney.png"}
                            alt={"Midjourney"}
                            style={{
                                width: 148,
                                height: 148,
                                borderRadius: 5,
                            }}
                        />
                    </Button>
                    <Button
                        className={cl.adding3}
                        sx={{background: modal2 ? "#ff0000" : "#ffffff",
                            '&:hover': {
                                backgroundColor: '#ff0000',
                            },}}
                        style={{
                            maxWidth: 150,
                            maxHeight: 150,
                            minWidth: 150,
                            minHeight: 150,
                            marginBottom: 15,
                            // position: "static",
                        }}
                        variant="contained"
                        onClick={showAdding3Modal}
                        title={'Kandinsky'}
                        disableRipple
                    >
                        <img
                            src={"Kandinsky.webp"}
                            alt={"Kandinsky"}
                            style={{
                                width: 148,
                                height: 148,
                                borderRadius: 5
                            }}
                        />
                    </Button>
                    <Button
                        className={cl.adding4}
                        sx={{background: modal3 ? "#ff0000" : "#ffffff",
                            '&:hover': {
                                backgroundColor: '#ff0000',
                            },}}
                        style={{
                            maxWidth: 150,
                            maxHeight: 150,
                            minWidth: 150,
                            minHeight: 150,
                            marginBottom: 15,
                            // position: "static",
                        }}
                        variant="contained"
                        onClick={showAdding4Modal}
                        title={'YandexGPT'}
                        disableRipple
                    >
                        <img
                            src={"yandexGPT.jpg"}
                            alt={"yandexGPT"}
                            style={{
                                width: 148,
                                height: 148,
                                borderRadius: 5
                            }}
                        />
                    </Button>
                    <Button
                        className={cl.adding5}
                        sx={{background: modal4 ? "#ff0000" : "#ffffff",
                            '&:hover': {
                                backgroundColor: '#ff0000',
                            },}}
                        style={{
                            maxWidth: 150,
                            maxHeight: 150,
                            minWidth: 150,
                            minHeight: 150,
                            marginBottom: 15,
                            // position: "static",
                        }}
                        variant="contained"
                        onClick={showAdding5Modal}
                        title={'DALL-E'}
                        disableRipple
                    >
                        <img
                            src={"Dall-e.jpg"}
                            alt={"Dall-e"}
                            style={{
                                width: 148,
                                height: 148,
                                borderRadius: 5
                            }}
                        />
                    </Button>
                    <Button
                        className={cl.adding6}
                        sx={{background: modal5 ? "#ff0000" : "#ffffff",
                            '&:hover': {
                                backgroundColor: '#ff0000',
                            },}}
                        style={{
                            maxWidth: 150,
                            maxHeight: 150,
                            minWidth: 150,
                            minHeight: 150,
                            // position: "static",
                        }}
                        variant="contained"
                        onClick={showAdding6Modal}
                        title={'LoveGPT'}
                        disableRipple
                    >
                        <img
                            src={"LoveGPT.jpg"}
                            alt={"LoveGPT"}
                            style={{
                                width: 148,
                                height: 148,
                                borderRadius: 5
                            }}
                        />
                    </Button>
                    {neurons
                        .filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((obj, index) => (
                            <NeuronObject
                                key={index}
                                name={obj.name}
                                description={obj.description}
                                images={obj.photos}
                            />
                        ))
                    }
                </div>
                )}
                {/*<ContentTest/>*/}
            </div>
        </div>
    );
};

export default LeftPanel;