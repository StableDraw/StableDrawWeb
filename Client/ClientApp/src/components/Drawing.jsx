import {React, useState, useMemo} from 'react';
import SideBar from "./UI/SideBar/SideBar.jsx";
import LableBar from "./UI/LableBar/LableBar.jsx";
import ScaleField from "./UI/ScaleField/ScaleField.jsx";
import GenBlock from "./UI/modal/GenBlock.jsx";
import Canvas from "./UI/canvas/Canvas.jsx";
import GraphicTable from "./UI/modal/GraphicTable.jsx";
import ToolBar from "./UI/Toolbar/ToolBar.jsx";
import PayModule from "./UI/payModule/PayBtn.jsx";
import BabylonModule from "./UI/BabylonModule/BabylonBtn.jsx";
import canvasState from "../store/canvasState";
import CanvasState from "../store/canvasState";
import ToolOptionsBar from './UI/ToolOptionsBar/ToolOptionsBar.jsx';
const Drawing = () => {

    const [label, setLabel] = useState()

    const resLabel = (res) => {
        setLabel(res)
    }

    /*Canvas STATE*/
    const [canvasList, setCanvasList] = useState([{
        id: Date.now(),
        index: 0,
        style: {border: "4px solid rgb(154, 154, 154)", zIndex: 0, position: "absolute", backgroundColor: "white", touchAction: "none",userSelect: "none"}
    }])

    const AddNewcanva = (newCanva) => {
        setCanvasList([...canvasList, newCanva])
    }
    const DeleteCanva = (data) => {
        // пожарный случай    Setcanvas(canvas.filter(c => canvasState.getCanvasList() !== c.find(item => item.attributes[1].value === приходные данные index canvas)))
            setCanvasList(canvasList.filter(c => c.index  !== parseInt(data)))
    }

    return (
        <div>
            <h1><span style={{textDecoration: 'underline', margin: 80, color: 'rgba(204,32,32,0.8)'}}>
                <span style={{color: 'rgba(83,107,234,0.9)', fontWeight: "bold" }}>S</span>table Drawing
            </span></h1>
            <div className = "subbody">
                
                <SideBar light={{item: '1', bla: 2}}/>
                <LableBar deleteCanva={DeleteCanva} canva={label} newCanva={AddNewcanva}/>
                <ScaleField />
                <ToolOptionsBar/>
                <GenBlock />

                <Canvas  canvasDate={canvasList} labelData={resLabel} width={"1080px"} height={"732px"}/>


                <GraphicTable />


                <BabylonModule/>
                <PayModule/>
                <ToolBar/>
            </div>
        </div>
    );
};

export default Drawing;