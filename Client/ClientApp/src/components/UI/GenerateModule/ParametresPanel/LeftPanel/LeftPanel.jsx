import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import cl from "./LeftPanel.module.css";
import "./LeftPanel.module.css";
import ContentTest from "./ContentTest";
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
// import NeuronItem from './NeuronItem';


const LeftPanel = ({props}) => {
    const [age, setAge] = useState('');
    const handleChange = (e) => {
        setAge(e.target.value);
    };
    const [filter, setFilter] = useState(false)
    const [activity, setActivety] = useState(false)
    const [activeBtn, setActiveBtn] = useState(null)
    const getActive = () => {
        setActivety(!activity)
    }
    // const data = [
    //     { icon: <People />, label: 'Authentication' },
    //     { icon: <Dns />, label: 'Database' },
    //     { icon: <PermMedia />, label: 'Storage' },
    //     { icon: <Public />, label: 'Hosting' },
    // ];
    //
    // const FireNav = styled(List)({
    //     '& .MuiListItemIcon-root': {
    //         minWidth: 0,
    //         marginRight: 16,
    //     },
    //     '& .MuiSvgIcon-root': {
    //         fontSize: 20,
    //     },
    // });

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
                    />
                    <IconButton>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" version="1.1">

                            <title>search</title>
                            <desc>Created with Sketch Beta.</desc>
                            <defs>

                            </defs>
                            <g id="Page-1" stroke="none" fill="none">
                                <g id="Icon-Set" transform="translate(-256.000000, -1139.000000)" fill="#ffffff">
                                    <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z" id="search">

                                    </path>
                                </g>
                            </g>
                        </svg>
                    </IconButton>
                    <NativeSelect
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
                    </NativeSelect>


                        {/*<FireNav*/}
                        {/*    component="nav"*/}
                        {/*    disablePadding*/}
                        {/*    sx={{*/}
                        {/*        color: '#000000',*/}
                        {/*        background: "#444444",*/}
                        {/*        borderRadius: 0,*/}
                        {/*        borderLeft: 1,*/}
                        {/*        borderBottom: 1,*/}
                        {/*        borderRight: 1,*/}
                        {/*        padding: 0,*/}
                        {/*        backgroundSize: 'cover',*/}
                        {/*    }}*/}

                        {/*>*/}
                        {/*    <Box*/}
                        {/*        sx={{*/}
                        {/*            padding: 0,*/}
                        {/*            backgroundSize: 'cover',*/}
                        {/*        }}*/}
                        {/*    >*/}

                        {/*        <ListItemButton*/}

                        {/*            className={cl.filter_btn}*/}
                        {/*            sx={{*/}
                        {/*                backgroundSize: 'cover',*/}
                        {/*                borderRight: 1,*/}
                        {/*                borderBottom: 1,*/}
                        {/*                maxHeight: 45,*/}
                        {/*                minHeight: 45,*/}
                        {/*                maxWidth: 36,*/}
                        {/*                minWidth: 36,*/}
                        {/*                color: '#000000',*/}
                        {/*                background: "#444444",*/}
                        {/*                padding: 0,*/}
                        {/*                '&:hover, &:focus': { '& svg': { opacity: activity ? 1 : 0 } },*/}
                        {/*                }}*/}
                        {/*            onClick={()=>setActivety(!activity)}*/}
                        {/*        >*/}

                        {/*            <img*/}
                        {/*                src={"filter.png"}*/}
                        {/*                alt={"filter"}*/}
                        {/*                style={{*/}
                        {/*                    width: 28,*/}
                        {/*                    height: 28,*/}
                        {/*                    backgroundColor: "#474747",*/}
                        {/*                    padding: 0,*/}
                        {/*                    backgroundSize: 'cover',*/}
                        {/*                }}*/}
                        {/*            />*/}
                        {/*        </ListItemButton>*/}
                        {/*        {activity &&*/}
                        {/*            data.map((item) => (*/}
                        {/*                <ListItemButton*/}
                        {/*                    key={item.label}*/}
                        {/*                    sx={{*/}
                        {/*                        py: 0,*/}
                        {/*                        minHeight: 32,*/}
                        {/*                        right: 150,*/}
                        {/*                        width: 180,*/}
                        {/*                        color: 'rgba(255,255,255,.8)',*/}
                        {/*                        backgroundColor: "#000000",*/}
                        {/*                        border: 1,*/}
                        {/*                        borderRadius: 1,*/}
                        {/*                        padding: 0,*/}
                        {/*                        backgroundSize: 'cover',*/}
                        {/*                }}*/}
                        {/*                >*/}
                        {/*                    <ListItemIcon sx={{ color: 'inherit', padding: 0}}>*/}
                        {/*                        {item.icon}*/}
                        {/*                    </ListItemIcon>*/}
                        {/*                    <ListItemText*/}
                        {/*                        primary={item.label}*/}
                        {/*                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium'}}*/}
                        {/*                    />*/}
                        {/*                </ListItemButton>*/}
                        {/*            ))}*/}
                        {/*    </Box>*/}
                        {/*</FireNav>*/}
                </div>
                {/*<hr className={cl.hrLine}/>*/}
                {/* <div className={cl.neurons}>
                    {
                    filteredNeurons.map((neuron, index) => {
                        // return(
                        //     <NeuronItem neuron={neuron} key={index} />
                        // )
                    })
                    }
                </div> */}

                <ContentTest
                />
            </div>
        </div>
    );
};

export default LeftPanel;