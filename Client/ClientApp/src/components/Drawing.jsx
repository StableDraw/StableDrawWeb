import React from 'react';
import SideBar from "./UI/menu/SideBar";
import LableBar from "./UI/menu/LableBar";
import ScaleField from "./UI/menu/ScaleField";
import GenBlock from "./UI/modal/GenBlock";
import Canvas from "./UI/canvas/Canvas";
import ColorMenu from "./UI/modal/ColorMenu";
import Pencil from "./UI/modal/Pencil";
import Eraser from "./UI/modal/Eraser";
import GraphicTable from "./UI/modal/GraphicTable";
import ToolBar from "./UI/menu/ToolBar";


const Drawing = () => {
    return (
        <div>
            <h1>
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