import React from 'react';
import SideBar from "./UI/SideBar/SideBar.jsx";
import LableBar from "./UI/LableBar/LableBar.jsx";
import ScaleField from "./UI/ScaleField/ScaleField.jsx";
import GenBlock from "./UI/modal/GenBlock.jsx";
import Canvas from "./UI/canvas/Canvas.jsx";
import ColorMenu from "./UI/modal/ColorMenu/ColorMenu.jsx";
import Pencil from "./UI/modal/Pencil/Pencil.jsx";
import Eraser from "./UI/modal/Eraser/Eraser.jsx";
import GraphicTable from "./UI/modal/GraphicTable.jsx";
import ToolBar from "./UI/Toolbar/ToolBar.jsx";
import PayModule from "./UI/payModule/PayBtn.jsx";


const Drawing = () => {
    return (
        <div>
            <h1><span style={{textDecoration: 'underline', margin: 80, color: 'rgba(204,32,32,0.8)'}}>
                <span style={{color: 'rgba(83,107,234,0.9)', fontWeight: "bold" }}>S</span>table Drawing
            </span></h1>
            <div className = "subbody">
                
                <SideBar light={{item: '1', bla: 2}}/>
                <LableBar />
                <ScaleField />
                
                {/* Будет принимать компонент с изображением <GenBlock><Сам компонент /> </GenBlock>*/}
                <GenBlock />

                <Canvas />

                {/*Переделать в компонент модалок У верхней менюшке*/}
                {/* <ColorMenu />*/}
                <Pencil />
                <Eraser />
                <GraphicTable />

                {/*НЕ ЕБУ ДЛЯ ЧЕГО*/}
                {/*<div className="palette_nav"></div>*/} 
                
                <ToolBar />

                <PayModule/>
            </div>
        </div>
    );
};

export default Drawing;