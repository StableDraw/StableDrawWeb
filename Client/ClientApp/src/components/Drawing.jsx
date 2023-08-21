import React, {useState} from 'react';
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
import Bucket from "./UI/modal/Bucket/Bucket";
import PayModule from "./UI/payModule/PayBtn.jsx";


const Drawing = () => {
    // const [drawingsArr, setDrawingsArr] = useState(["rgb(255, 255, 255)"]);
    // function Clear(){
    //     setDrawingsArr(drawingsArr => [...drawingsArr, "url(alpha_pattern.png)"]);
    // } работает, нужно масштабировать

    const startSet = [
        {id: 1, backgrd: "rgb(0, 255, 255)"},
        {id: 2, backgrd: "rgb(255, 0, 255)"},
        {id: 3, backgrd: "rgb(255, 255, 0)"}
    ]

    let index = 1;
    const [drawingsArr, setDrawingsArr] = useState(startSet);

    // alert(startSet[id]);

    function Clear(){
        // setDrawingsArr([["url(alpha_pattern.png)"]]);
        // setDrawingsArr(drawingsArr => [drawingsArr].map(el => el.id === index ? ({id: el.id, backgrd: "url(alpha_pattern.png)"}) : el))
        // console.log(drawingsArr);
        let background = drawingsArr.find(obj => obj.id === index);
        setDrawingsArr(drawingsArr.obj = {id: index, backgrd: "url(alpha_pattern.png)"});
    }

    return (
        <div>
            <h1><span style={{textDecoration: 'underline', margin: 80, color: 'rgba(204,32,32,0.8)'}}>
                <span style={{color: 'rgba(83,107,234,0.9)', fontWeight: "bold" }}>S</span>table Drawing
            </span></h1>
            <div className = "subbody">
                
                <SideBar light={{item: '1', bla: 2}}/>
                <LableBar drawingsArr={drawingsArr} index = {index} Clear = {Clear}/>
                <ScaleField />
                
                {/* Будет принимать компонент с изображением <GenBlock><Сам компонент /> </GenBlock>*/}
                <GenBlock />

                <Canvas drawingsArr={drawingsArr} index = {index}/>

                {/*Переделать в компонент модалок У верхней менюшке*/}
                <ColorMenu />
                <Pencil />
                <Eraser />
                <Bucket/>
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