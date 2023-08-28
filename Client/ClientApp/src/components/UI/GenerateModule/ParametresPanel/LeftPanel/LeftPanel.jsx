import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import cl from "./LeftPanel.module.css";
import "./LeftPanel.module.css";
import ContentTest from "./ContentTest";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
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
import Close from "@mui/icons-material/Close";
// import NeuronItem from './NeuronItem';


const LeftPanel = ({props}) => {
    const [filter, setFilter] = useState(false)
    const [activity, setActivety] = useState(false)
    const [activeBtn, setActiveBtn] = useState(null)
    const getActive = () => {
        setActivety(!activity)
    }
    const data = [
        { icon: <People />, label: 'Authentication' },
        { icon: <Dns />, label: 'Database' },
        { icon: <PermMedia />, label: 'Storage' },
        { icon: <Public />, label: 'Hosting' },
    ];

    const FireNav = styled(List)({
        '& .MuiListItemButton-root': {
            paddingLeft: 24,
            paddingRight: 24,
        },
        '& .MuiListItemIcon-root': {
            minWidth: 0,
            marginRight: 16,
        },
        '& .MuiSvgIcon-root': {
            fontSize: 20,
        },
    });

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
                        <img
                            src={"search1.webp"}
                            alt={"search1"}
                            style={{width: 28, height: 28, borderRadius: 100, backgroundColor: "#474747"}}
                        />
                    </IconButton>

                        <FireNav component="nav" disablePadding sx={{color: '#000000', background: "#444444", borderRadius: 0, borderLeft: 1, borderBottom: 1, borderRight: 1, padding: 0}}>
                            <Box
                                sx={{
                                    padding: 0,
                                }}
                            >

                                <ListItemButton

                                    className={cl.filter_btn}
                                    sx={{

                                        borderRight: 1,
                                        borderBottom: 1,
                                        maxHeight: 45, minHeight: 45, maxWidth: 36, minWidth: 36, color: '#000000', background: "#444444",
                                        padding: 0,
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                        '&:hover, &:focus': { '& svg': { opacity: activity ? 1 : 0 } },
                                        }}
                                    onClick={()=>setActivety(!activity)}
                                >

                                    <img
                                        src={"filter.png"}
                                        alt={"filter"}
                                        style={{width: 28, height: 28, backgroundColor: "#474747", padding: 0}}
                                    />
                                </ListItemButton>
                                {activity &&
                                    data.map((item) => (
                                        <ListItemButton
                                            key={item.label}
                                            sx={{ py: 0, minHeight: 32, right: 150, width: 180, color: 'rgba(255,255,255,.8)', backgroundColor: "#000000", border: 1, borderRadius: 1, padding: 0}}
                                        >
                                            <ListItemIcon sx={{ color: 'inherit', padding: 0}}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.label}
                                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                            />
                                        </ListItemButton>
                                    ))}
                            </Box>
                        </FireNav>

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