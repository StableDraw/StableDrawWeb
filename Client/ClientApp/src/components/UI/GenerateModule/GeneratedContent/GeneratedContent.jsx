import React, {useEffect, useState} from 'react';
import cl from "../GeneratedContent/GeneratedContent.module.scss";
import { styled } from '@mui/material/styles';
import LeftPanel from "../ParametresPanel/LeftPanel/LeftPanel";
import ParamsWindow from "../ParametresPanel/RightPanel/ParamsWindow/ParamsWindow";
import ZeroImagesVariant from "../ParametresPanel/RightPanel/ParamsWindow/ZeroImagesVariant";
import OneImageVariant from "../ParametresPanel/RightPanel/ParamsWindow/OneImageVariant";
import TwoImagesVariant from "../ParametresPanel/RightPanel/ParamsWindow/TwoImagesVariant";
import Button from "@mui/material/Button";
import Close from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {NeuronObject} from "../ParametresPanel/LeftPanel/NeuronObject";

import Tooltip, {tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} placement="right-start"/>
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgba(51,51,51, 0.7)',
        color: 'rgba(255, 255, 255, 0.9)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));
const GeneratedContent = ({setModal, props}) => {
    const [modal4, setModal4] = useState(false)
    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [modal3, setModal3] = useState(false)

    const showAdding1Modal = () => {
        setModal4(!modal4)
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
    return (
        <div className={cl.contentBox}>
            <header>
                <div className={cl.header}>
                    <Button
                        className={cl.closebtn}
                        sx={{
                            maxWidth: 35,
                            maxHeight: 35,
                            minWidth: 35,
                            minHeight: 35,
                            color: '#ffffff',
                            background: "#333333",
                        }}
                        onClick={()=>setModal(false)}
                    >
                        <Close
                            color="primary"
                            sx={{
                                fontSize: 28,
                                color: "#fff",
                                justifyContent: "center",
                            }}
                        />
                    </Button>
                </div>
            </header>
            <div className={cl.contented}>
                <div className={cl.leftpanel}>
                    <div className={cl.agreeWindow}>
                        <div className={cl.search_container}>
                            <input
                                type="text"
                                className={cl.search_box}
                                required minLength="1"
                                maxLength="100"
                                size="100"
                                placeholder="Поиск нейросетей..."
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
                        </div>
                        {/*<hr className={cl.hrLine}/>*/}
                        {isLoading ? (
                            <h3 style={{color: "#ffffff"}}>Please, wait for the page loading...</h3>
                        ) : (
                            <div className={cl.Text}>
                                <HtmlTooltip
                                    title={
                                        <React.Fragment>
                                            <Typography color="inherit">Drawing to animation</Typography>
                                            <em>{"Если ты ленив, и при этом тебе нужна анимация по зарисовке, данный тип нейросети"}</em> <b>{'сделает это'}</b> <u>{'великолепным образом'}</u>.{' '}
                                            {"Хотите попробовать?"}
                                        </React.Fragment>
                                    }
                                >
                                    <Button
                                        className={cl.adding1}
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
                                            marginTop: 2,
                                            position: "static",
                                        }}
                                        variant="contained"
                                        onClick={showAdding1Modal}
                                        title={'frames_to_animation'}
                                        visible={modal4}
                                        setVisible={setModal4}
                                        disableRipple
                                    >
                                        <img
                                            src={"frames_to_animation.png"}
                                            alt={"frames_to_animation"}
                                            style={{
                                                width: 148,
                                                height: 148,
                                                borderRadius: 5,
                                            }}
                                        />
                                    </Button>
                                </HtmlTooltip>
                                <HtmlTooltip
                                    title={
                                        <React.Fragment>
                                            <Typography color="inherit">Image to Image</Typography>
                                            <em>{"Наилучший вариант генерации изображения с помощью"}</em> <b>{'рисунка на канвасе.'}</b> <u>{'Переводит вашу собственную зарисовку в сгенерированное изображение'}</u>.{' '}
                                            {"Хотите попробовать?"}
                                        </React.Fragment>
                                    }
                                >
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
                                        title={'wtf'}

                                        disableRipple
                                        visible={modal1} setVisible={setModal1}
                                    >
                                        <img
                                            src={".wtf.png"}
                                            alt={"wtf"}
                                            style={{
                                                width: 148,
                                                height: 148,
                                                borderRadius: 5,
                                            }}
                                        />
                                    </Button>
                                </HtmlTooltip>
                                <HtmlTooltip
                                    title={
                                        <React.Fragment>
                                            <Typography color="inherit">Photo to Image</Typography>
                                            <em>{"Хотите видоизменить только что сделанную фотографию с помощью нейросети? Тогда вам"}</em> <b>{'сюда.'}</b> <u>{'Этот тип нейросети генерирует картинку из фотографии.'}</u>.{' '}
                                            {"Хотите попробовать?"}
                                        </React.Fragment>
                                    }
                                >
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
                                        title={'photo_to_image'}
                                        visible={modal2}
                                        setVisible={setModal2}
                                        disableRipple
                                    >
                                        <img
                                            src={"photo_to_image.png"}
                                            alt={"photo_to_image"}
                                            style={{
                                                width: 148,
                                                height: 148,
                                                borderRadius: 5
                                            }}
                                        />
                                    </Button>
                                </HtmlTooltip>
                                <HtmlTooltip
                                    title={
                                        <React.Fragment>
                                            <Typography color="inherit">Text to Animation</Typography>
                                            <em>{"Самый простой способ генерации по типу таких нейросетей-гигантов, как Midjourney и"}</em> <b>{'Chat.GPT'}</b> <u>{'Данный тип нейросетей генерирует изображения по текстовому описанию.'}</u>.{' '}
                                            {"Хотите увидеть это?"}
                                        </React.Fragment>
                                    }
                                >
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
                                        title={'text_to_image'}
                                        disableRipple
                                        visible={modal3}
                                        setVisible={setModal3}
                                    >
                                        <img
                                            src={"text_to_image.png"}
                                            alt={"text_to_image"}
                                            style={{
                                                width: 148,
                                                height: 148,
                                                borderRadius: 5
                                            }}
                                        />
                                    </Button>
                                </HtmlTooltip>
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
                    </div>
                </div>
                {modal4 ? <ZeroImagesVariant/>  :
                    (modal1 ? <OneImageVariant/>  :
                        (modal2 ? <TwoImagesVariant/>  :
                            (modal3 ? <ParamsWindow/>  : '')))
                }
            </div>
        </div>
    );
};
export default GeneratedContent;