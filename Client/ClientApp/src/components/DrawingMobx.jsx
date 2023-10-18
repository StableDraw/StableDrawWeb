import { React, useState } from 'react';
import GenBlock from "./UI/modal/GenBlock.jsx";
import GraphicTable from "./UI/modal/GraphicTable.jsx";
import ToolBar from "./UI/Toolbar/ToolBar.jsx";
import BabylonModule from "./UI/BabylonModule/BabylonBtn.jsx";
import ToolOptionsBar from './UI/ToolOptionsBarMobx/ToolOptionsBar.jsx';
import GenerateModule from './UI/GenerateBtnMobx/GenerationBtn.jsx'
import cl from "./Drawing.module.css"
// ДОБАВЛЕНИЕ КОМПОНЕТОВ СО СТЕЙТАМИ
import LableBar from "./UI/LableBarMobx/LableBar.jsx";
import GenerateWindow from '../components/UI/GenerateWindiwMobx/GenerateBtn/GenerateBtn.jsx'
import Canvas from "./UI/canvasMobx/Canvas.jsx";

import canvasState from '../store/canvasState.tsx';

import { Link } from 'react-router-dom';
const Drawing = () => {



    return (
        <div>
            <div className={cl.main}>
                <ToolBar />
                <div className={cl.main__content}>

                    <div className={cl.col}>

                        <div className={[cl.row, cl.canvas__button].join(" ")}>
                            <ToolOptionsBar />
                            <GenerateModule />
                            <GenerateWindow />
                        </div>
                        <Canvas/>
                    </div>
                    <div className={[cl.col, cl.block].join(" ")} style={{ padding: "0 0 0 5px" }}>
                        {/* <div className={[cl.row, cl.canvas__button].join(" ")} style={{ gap: "9px", paddingTop: "10vh" }}>
                            <BabylonModule />
                            <Link className={cl.link} to='/Pay'>
                                <span className={cl.subscribe__txt}> Подписка</span>
                            </Link>
                        </div> */}
                        <div style={{ gap: "9px", paddingTop: "10vh" }}/>
                        <LableBar/>
                    </div>
                    {/* <GenBlock /> */}
                </div>
                {/* <GraphicTable /> */}
            </div>
        </div>
    );
};

export default Drawing;