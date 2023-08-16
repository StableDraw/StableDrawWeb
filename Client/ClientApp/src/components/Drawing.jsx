import React, {useState, useMemo} from 'react';
import SideBar from "./UI/SideBar/SideBar.jsx";
import LableBar from "./UI/LableBar/LableBar.jsx";
import ScaleField from "./UI/ScaleField/ScaleField.jsx";
import GenBlock from "./UI/modal/GenBlock.jsx";
import Canvas from "./UI/canvas/Canvas.jsx";
import GraphicTable from "./UI/modal/GraphicTable.jsx";
import ToolBar from "./UI/Toolbar/ToolBar.jsx";
import PayModule from "./UI/payModule/PayBtn.jsx";
import BabylonModule from "./UI/BabylonModule/BabylonBtn.jsx";


const Drawing = () => {
    const [res, setRes] = useState()
    const consol = (result) => {
        setRes(result)
    }
    console.log(res)
    const [background, setBackground] = useState("rgb(255, 255, 255)");
    const [drawingsArr, setDrawingsArr] = useState([background]);
    const Clear = () => {
        setBackground("rgb(255, 255, 255)");
        setDrawingsArr([background]);
        // alert(drawingsArr)
    }
    return (
        <div>
            <h1><span style={{textDecoration: 'underline', margin: 80, color: 'rgba(204,32,32,0.8)'}}>
                <span style={{color: 'rgba(83,107,234,0.9)', fontWeight: "bold" }}>S</span>table Drawing
            </span></h1>
            <div className = "subbody">
                
                <SideBar light={{item: '1', bla: 2}}/>
                <LableBar drawingsArr={drawingsArr} Clear = {Clear}/>
                <ScaleField />
                
                {/* Будет принимать компонент с изображением <GenBlock><Сам компонент /> </GenBlock>*/}
                <GenBlock />

                <Canvas drawingsArr={drawingsArr}/>

                {/*Переделать в компонент модалок У верхней менюшке*/}

                {/*<ColorPalete />*/}
                {/*<Pencil />*/}
                {/*<Eraser />*/}
                {/*<Bucket/>*/}
                <GraphicTable />

                {/*НЕ ЕБУ ДЛЯ ЧЕГО*/}
                {/*<div className="palette_nav"></div>*/} 
                <BabylonModule/>
                <PayModule/>
                <ToolBar getRes={consol}/>
                <BabylonModule/>
                <PayModule/>
            </div>
        </div>
    );
};

export default Drawing;