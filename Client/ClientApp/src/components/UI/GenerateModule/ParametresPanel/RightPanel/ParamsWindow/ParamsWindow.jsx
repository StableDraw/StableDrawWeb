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

const ParamsWindow = ({setModal}) => {
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
                <input
                    className={cl.searcher}
                    type="text"
                    id="name"
                    name="name"
                    required minLength="1"
                    maxLength="100"
                    size="100"
                />
                <Button
                    className={cl.searchBtn}
                    variant="contained"
                    sx={{background: "#474747", color: "#ffffff", fontSize: 11}}
                >
                    <SettingsIcon sx={{ fontSize: 20 }}/>
                </Button>
                <div className={cl.parametresWind}>
                    <div className={cl.bordercont}>
                        <div className={cl.Tex}>
                            <div className={cl.pointText}> 
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
                                    placement="right-start"
                                >
                                    <HelpOutlineIcon 
                                        sx={{ fontSize: 18, marginLeft: 1, marginTop: 1, cursor: "help", backgroundColor: "#000000", borderRadius: 100}}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                        <div className={cl.Tex}>
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
                                        placement="right-start"
                                    >
                                        <HelpOutlineIcon 
                                            sx={{ fontSize: 18,  marginTop: 1.5, cursor: "help", backgroundColor: "#000000", borderRadius: 100}}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <div className={cl.Tex}>
                                <div className={cl.pointText}> 
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
                                                <option 
                                                    className={cl.opt} 
                                                    value="sound"
                                                >
                                                    sound
                                                </option>

                                                <option 
                                                    className={cl.opt} 
                                                    value="smoothing"
                                                >
                                                    smoothing
                                                </option>

                                                <option 
                                                    className={cl.opt} 
                                                    value="brightness"
                                                >
                                                    brightness
                                                </option>

                                                <option 
                                                    className={cl.opt} 
                                                    value="usability"
                                                >
                                                    usability
                                                </option>
                                            </select>
                                        </label>
                                    </div>
                                    <div>
                                        <Tooltip 
                                            title={'Я подсказка'} 
                                            placement="right-start"
                                        >
                                            <HelpOutlineIcon 
                                                sx={{ fontSize: 18, marginLeft: 1, cursor: "help", backgroundColor: "#000000", borderRadius: 100}}
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                        </div>
                        <div className={cl.Tex}>
                            <div className={cl.pointText}> 
                                Params3: 
                            </div> 
                            <div className={cl.pointText}>
                                <div>
                                    <label className={cl.switch}>
                                        <input type="checkbox" />
                                            <span
                                                className={cl.slider_round}
                                            >
                                            </span>
                                    </label>
                                </div>
                                <div>
                                    <Tooltip 
                                        title={'Я подсказка'} 
                                        placement="right-start"
                                    >
                                        <HelpOutlineIcon 
                                            sx={{ fontSize: 18, marginLeft: 1, marginTop: 0.5, cursor: "help", backgroundColor: "#000000", borderRadius: 100}}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>   
                        <div className={cl.Tex}>
                            <div className={cl.pointText}> 
                                Params4: 
                            </div>
                            <div className={cl.pointText}>
                                <div className={cl.slider}> 
                                    <Slider 
                                        size="small" 
                                        aria-label="Small"  
                                        defaultValue={70} 
                                        valueLabelDisplay="auto"
                                    />
                                </div>
                                <div>
                                    <Tooltip 
                                        title={'Я подсказка'} 
                                        placement="right-start"
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
                    sx={{background: "#474747", color: "#ffffff", fontSize: 14}} 
                    onClick={()=>setModal(false)}
                >
                    Отмена
                </Button>
                <Button
                    className={cl.generatingBtn}
                    variant="contained"
                    sx={{background: "#474747", '&:hover': {backgroundColor: '#474747', color: '#555DD3'}, fontSize: 14}}
                    onClick={()=>setModal(false)}
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