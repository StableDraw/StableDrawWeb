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
                                        placement="top"
                                    >
                                        <HelpOutlineIcon 
                                            sx={{ fontSize: 18, marginLeft: 1, marginTop: 0.5, cursor: "help", backgroundColor: "#000000", borderRadius: 100}}
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