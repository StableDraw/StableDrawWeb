import React from 'react';
import SideBar from "./UI/SideBar/SideBar.jsx";
import LableBar from "./UI/LableBar/LableBar.jsx";
import ScaleField from "./UI/ScaleField/ScaleField.jsx";
import GenBlock from "./UI/modal/GenBlock.jsx";
import Canvas from "./UI/Canvas/Canvas.jsx";
import ColorMenu from "./UI/modal/ColorMenu/ColorMenu.jsx";
import Pencil from "./UI/modal/Pencil/Pencil.jsx";
import Eraser from "./UI/modal/Eraser/Eraser.jsx";
import GraphicTable from "./UI/modal/GraphicTable.jsx";
import ToolBar from "./UI/Toolbar/ToolBar.jsx";


const Drawing = () => {
    return (
        <div>
            <h1  style={{marginLeft:'60px'}}>
                Test Drawing
            </h1>
            <div className = "subbody">
                
                <SideBar light={{item: '1', bla: 2}}/>
                <LableBar />
                <ScaleField />
                
                {/* Будет принемать компонент с изображением <GenBlock><Сам компонент /> </GenBlock>*/}
                {/*<GenBlock />*/}

                <Canvas />

                {/*Переделать в компонент модалок У верхней менюшке*/}
                {/* <ColorMenu />*/}
                {/*<Pencil />*/}
                {/*<Eraser />*/}
                {/*<GraphicTable />*/}

                {/*НЕ ЕБУ ДЛЯ ЧЕГО*/}
                {/*<div className="palette_nav"></div>*/} 
                
                <ToolBar />
            </div>
        </div>
    );
};

export default Drawing;