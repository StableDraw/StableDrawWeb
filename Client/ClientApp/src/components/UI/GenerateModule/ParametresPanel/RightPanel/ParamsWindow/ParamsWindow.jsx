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
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        '#fff',
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
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
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
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
                                style={{width: 210, height:210, backgroundColor: "#474747"}}
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
                        <img
                            src={"search1.webp"}
                            alt={"search1"}
                            style={{width: 25, height: 25, borderRadius: 100, backgroundColor: "#666666"}}
                        />
                    </IconButton>
                </div>
                <Button
                    className={cl.searchBtn}
                    variant="contained"
                    sx={{background: "#474747", color: "#ffffff", '&:hover': {backgroundColor: '#ffffff', color: '#555DD3'}, fontSize: 11}}
                >
                    <img
                        src={"saveset.png"}
                        alt={"saveset"}
                        style={{width: 40, height: 40, borderRadius: 2}}
                    />
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
                                        sx={{ fontSize: 18, marginLeft: 1, marginTop: 1, cursor: "help", backgroundColor: "#000000", borderRadius: 100}}
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
                                            sx={{ fontSize: 18, marginLeft: 1, marginBottom: 0.5, cursor: "help", backgroundColor: "#000000", borderRadius: 100}}
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
                                            sx={{ fontSize: 18, marginLeft: 1, marginTop: 2, cursor: "help", backgroundColor: "#000000", borderRadius: 100}}
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
                                            sx={{ fontSize: 18, marginLeft: 1.5, cursor: "help", backgroundColor: "#000000", borderRadius: 100}}
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
                    sx={{background: "#474747", '&:hover': {backgroundColor: '#ffffff', color: '#555DD3'}, color: "#ffffff", fontSize: 14}} 
                    onClick={()=>setModal(false)}
                >
                    Отмена
                </Button>
                <Button
                    className={cl.generatingBtn}
                    variant="contained"
                    sx={{background: "#474747", '&:hover': {backgroundColor: '#474747', color: '#555DD3'}, fontSize: 14}}
                    onClick={()=>End()}
                >
                    <t>
                        Отправить на генерацию
                    </t>
                </Button>
            </div>
        </div>
    );
};
export default ParamsWindow;