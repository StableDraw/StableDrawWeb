import React, {useEffect, useState, useMemo, useRef} from 'react';
import cl from './ParamsWindow.module.css';
import './ParamsWindow.module.css';
import Button from '@mui/material/Button';
import api from "../../../../../../api/api";
import Agreement1 from './Agreement1';
import Tooltip from '@mui/material/Tooltip';
import Slider from '@mui/material/Slider';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import MyNewInput from './MyNewInput';

const ParamsWindow = ({setModal, props}) => {
    const [checked1, setChecked1] = React.useState(true);
    const [checked2, setChecked2] = React.useState(true);
    const [checked3, setChecked3] = React.useState(true);
    const [checked4, setChecked4] = React.useState(true);
    const [checked5, setChecked5] = React.useState(true);
    const [checked6, setChecked6] = React.useState(true);

    const showAdding1Modal = () => {
        setChecked1(!checked1);
    }
    const showAdding2Modal = () => {
        setChecked2(!checked2);
    }
    const showAdding3Modal = () => {
        setChecked3(!checked3);
    }
    const showAdding4Modal = () => {
        setChecked4(!checked4);
    }
    const showAdding5Modal = () => {
        setChecked5(!checked5);
    }
    const showAdding6Modal = () => {
        setChecked6(!checked6);
    }

    const [res, setRes] = useState()
    const consol = (result) => {
        setRes(result)
    }
    console.log(res)
    const fileRef = useRef();
    const handleChange1 = (e) => {
        const [file] = e.target.files;
        console.log(file);
    };
    const [checked, setChecked] = React.useState(true);
    const [roomId, setRoomId] = useState('general');
    const handleChange = () => {
        setChecked(!checked);
    }
    // <h3>  OR  </h3>
    // <input accept="image/*" id="icon-button-file"
    //        type="file" style={{ display: 'none' }} />
    // <label htmlFor="icon-button-file">
    //     <IconButton color="primary" aria-label="upload picture"
    //                 component="span">
    //         <PhotoCamera />
    //     </IconButton>
    // </label>
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     const getNews = async () => {
    //         const {data} = await axios({
    //             method: `get`,
    //             url: `http://swapi.dev/api/vehicles`
    //         })
    //
    //         dispatch(setStarships(data.results))
    //     }
    //     getNews();
    // }, [])
    const [drago, setDrago] = useState(false);
    const [textureStorage, setTextureStore] = useState([]);
    const [currenTexture, setCurrenTexture] = useState([])

    useEffect(() => {
        const getTexStorage = async () => {
            await api.GetTextureStorage()
                .then(res => {
                    const id = res.data
                    setTextureStore(id)
                })
                .catch(err => console.log(err))
        };
        getTexStorage();
    }, []);

    const uploadTexture = (el) => {
        setCurrenTexture([...el]);
    }

    const dragStartHandler = (e) => {
        e.preventDefault();
        setDrago(true)
    };

    const dragLeaveHandler = (e) => {
        e.preventDefault();
        setDrago(false);
    }

    async function Send(img) {
        try {
            const data = await api.LoadTexture(img)
            const texes = data.data.map((el) => "https://localhost:44404/api/image/" + el)
            setCurrenTexture([...texes])
            return data
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
    const onDropHandler = (e) => {
        e.preventDefault();
        let filesName = e.dataTransfer.files[0].name.split('.')
        console.log("split:", filesName)
        if (!textureStorage.includes(filesName[0])) {
            let files = [...e.dataTransfer.files];
            console.log("Хранилище:", textureStorage);
            let formData = new FormData();
            formData.append(`file`, files[0]);
            formData.append("Content-Type", 'multipart/form-data')
            Send(formData)
            setDrago(false);
        }
    }
    const End = () => {
        setModal(false)
        alert('Генерация в данный момент недоступна')
    }

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#1976d2',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 16 16" fill="none"><path fill="${encodeURIComponent(
                        '#fff',
                    )}" d="M2,9.014L3.414,7.6L6.004,10.189L12.593,3.6L14.007,5.014L6.003,13.017L2,9.014Z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#666666' : '#666666',
                },

            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#1976d2' : '#1976d2',
            width: 32,
            height: 32,
            '&:before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"/></svg>')`,
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#666666' : '#666666',
            borderRadius: 20 / 2,
        },
    }));

    return (
        <div className={cl.parametresBlock}>
            <div className={cl.imageBlock}>
                <div className={cl.addBlock}>
                    <div style={{
                        display: 'flex',
                        margin: 'auto',
                        width: 400,
                        flexWrap: 'wrap',
                    }}>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            ref={fileRef}
                            onChange={handleChange1}
                            multiple={false}
                            hidden
                        />
                        <label htmlFor="contained-button-file">
                            <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                style={{width: 210, height: 210, backgroundColor: "#474747"}}
                                onClick={() => fileRef.current}
                            >
                                <img
                                    className={cl.adding}
                                    draggable="true"
                                    onDragStart={dragStartHandler}
                                    src={"adding.png"}
                                    alt={"adding"}
                                    style={{width: 150, height: 150, borderRadius: 5}}
                                />
                            </Button>
                        </label>
                    </div>
                    {drago ?
                        <div className={cl.drag_loadImg}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDrop={e => onDropHandler(e)}
                                onDragOver={e => dragStartHandler(e)}
                        >
                        </div> :
                        <div className={cl.drag_loadImg}
                                onDragStart={e => dragStartHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragOver={e => dragStartHandler(e)}>
                        </div>
                    }
                </div>
            </div>
            <div className={cl.parametrsWindow}>
                <div className={cl.search_container}>
                    <input
                        className={cl.searcher}
                        type="text"
                        id="name"
                        name="name"
                        required minLength="1"
                        maxLength="100"
                        size="100"
                        placeholder="Поиск параметров выбранной нейронки.."
                    />
                    <IconButton>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32" version="1.1">

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
                </div>
                <Button
                    className={cl.searchBtn}
                    variant="contained"
                    sx={{
                        background: "#474747",
                        color: "#ffffff",
                        '&:hover': {
                            backgroundColor: '#ffffff',
                            color: '#555DD3',
                        },
                        fontSize: 11,
                    }}
                >
                    <div>
                        <svg className={cl.Icon_Set} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                            <path d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z" />
                        </svg>
                    </div>
                </Button>
                    <div className={cl.parametresWind}>
                    <div className={cl.bordercont}>
                        <div className={cl.Tex}>
                            <div className={cl.pointText1}>
                                Params: 
                            </div>
                            <div className={cl.pointText}>
                                <input
                                    className={cl.searcher1}
                                    type="text"
                                    id="name"
                                    name="name"
                                    required minLength="1"
                                    maxLength="100"
                                    size="100"
                                />
                                <Tooltip 
                                    title={'Я подсказка'} 
                                    placement="top"
                                >
                                    <HelpOutlineIcon 
                                        sx={{
                                            fontSize: 18,
                                            marginLeft: 1,
                                            marginTop: 1,
                                            cursor: "help",
                                            backgroundColor: "#000000",
                                            borderRadius: 100
                                        }}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                        {/* <div className={cl.Tex}>
                            <div className={cl.pointText}>
                                Params1: 
                            </div>
                            <div className={cl.pointText}>
                                <div> 
                                    <Agreement1 
                                        checked = {!checked} 
                                        handleChange = {handleChange}
                                    /> 
                                </div>
                                <div>
                                    <Tooltip 
                                        title={'Я подсказка'} 
                                        placement="top"
                                    >
                                        <HelpOutlineIcon 
                                            sx={{ fontSize: 18,  marginTop: 1.5, cursor: "help", backgroundColor: "#000000", borderRadius: 100}}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        </div> */}
                        <div className={cl.Tex}>
                            <div className={cl.pointText1}> 
                                Params2: 
                            </div>
                            <div className={cl.pointText}>
                                <div>
                                    <label className={cl.agree1}>
                                        <select
                                            className={cl.liststyle}
                                            value={roomId}
                                            onChange={e => setRoomId(e.target.value)}
                                        >   
                                            {/* <div className={cl.dropdown_options}>
                                                <a href="#" value="sound">sound</a>
                                                <a href="#" value="smoothing">smoothing</a>
                                                <a href="#" value="brightness">brightness</a>
                                                <a href="#" value="usability">usability</a> */}
                                                <option  
                                                    value="sound"
                                                >
                                                    sound
                                                </option>

                                                <option 
                                                    value="smoothing"
                                                >
                                                    smoothing
                                                </option>

                                                <option 
                                                    value="brightness"
                                                >
                                                    brightness
                                                </option>

                                                <option 
                                                    value="usability"
                                                >
                                                    usability
                                                </option>
                                            {/* </div> */}
                                            
                                        </select>
                                    </label>
                                </div>
                                <div>
                                    <Tooltip 
                                        title={'Я подсказка'} 
                                        placement="top"
                                    >
                                        <HelpOutlineIcon 
                                            sx={{
                                                fontSize: 18,
                                                marginLeft: 1,
                                                marginBottom: 0.5,
                                                cursor: "help",
                                                backgroundColor: "#000000",
                                                borderRadius: 100
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <div className={cl.Tex}>
                            <div className={cl.pointText1}> 
                                Params3: 
                            </div>
                            <div className={cl.pointText}>
                                {/*<label className={cl.switch}>
                                <input type="checkbox" />
                                <span
                                    className={cl.slider_round}
                                >
                                            </span>
                            </label>*/}
                                <div>
                                    <MaterialUISwitch sx={{ m: 1 }} defaultChecked />
                                </div>
                                <div>
                                    <Tooltip 
                                        title={'Я подсказка'} 
                                        placement="top"
                                    >
                                        <HelpOutlineIcon 
                                            sx={{
                                                fontSize: 18,
                                                marginLeft: 1,
                                                marginTop: 2,
                                                cursor: "help",
                                                backgroundColor: "#000000",
                                                borderRadius: 100
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>   
                        <div className={cl.Tex}>
                            <div className={cl.pointText1}> 
                                Params4: 
                            </div>
                            <div className={cl.pointText}>
                                <div className={cl.slider}>
                                    <MyNewInput id='slider' callback={consol}/>
                                </div>
                                <div>
                                    <Tooltip 
                                        title={'Я подсказка'} 
                                        placement="top"
                                    >
                                        <HelpOutlineIcon 
                                            sx={{
                                                fontSize: 18,
                                                marginLeft: 1.5,
                                                cursor: "help",
                                                backgroundColor: "#000000",
                                                borderRadius: 100
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    className={cl.cancelBtn}
                    variant="contained"
                    sx={{
                        background: "#474747",
                        '&:hover': {
                            backgroundColor: '#ffffff',
                            color: '#555DD3'
                        },
                        color: "#ffffff",
                        fontSize: 14
                    }}
                    onClick={()=>setModal(false)}
                >
                    Отмена
                </Button>
                <Button
                    className={cl.generatingBtn}
                    variant="contained"
                    sx={{
                        background: "#474747",
                        '&:hover': {
                            backgroundColor: '#ffffff',
                            color: '#555DD3'
                        },
                        fontSize: 14
                    }}
                    onClick={()=>End()}
                >
                    Отправить на генерацию
                </Button>
            </div>
        </div>
    );
};
export default ParamsWindow;