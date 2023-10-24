import { React, useState } from 'react';
import LableBar from "./UI/LableBarMobx/LableBar.jsx";
// import GenBlock from "./UI/modal/GenBlock.jsx";
import Canvas from "./UI/canvas/Canvas.jsx";
import ToolBar from "./UI/Toolbar/ToolBar.jsx";
import BabylonModule from "./UI/BabylonModule/BabylonBtn.jsx";
import ToolOptionsBar from './UI/ToolOptionsBar/ToolOptionsBar.jsx';
import GenerateModule from './UI/GenerateBtn/GenerationBtn.jsx'
import canvasState from "../store/canvasState";
import cl from "./Drawing.module.css"
import GenerateWindow from '../components/UI/GenerateWindiwMobx/GenerateBtn/GenerateBtn.jsx'
import { Link } from 'react-router-dom';
const Drawing = () => {

    const [label, setLabel] = useState()
    const [width, setWidth] = useState(1024)
    const [height, setHeight] = useState(640)

    const resLabel = (res) => {
        setLabel(res)
    }

    /*Canvas STATE*/
    const [canvasList, setCanvasList] = useState([{
        id: Date.now(),
        index: 0,
        style: { zIndex: 0, position: "absolute", backgroundColor: "white", touchAction: "none", userSelect: "none" }
    }])

    const [mergeRes, setMergeRes] = useState(null)

    const Merge = (data) => {
        setMergeRes(data)
        // console.log(CanvasState.getCanvas())
    }

    /* Добавление канваса */
    const AddNewcanva = (newCanva) => {
        setCanvasList([...canvasList, newCanva])
    }

    /* Удаление канваса */
    const DeleteCanva = (data) => {
        // пожарный случай    Setcanvas(canvas.filter(c => canvasState.getCanvasList() !== c.find(item => item.attributes[1].value === приходные данные index canvas)))
        setCanvasList(canvasList.filter(c => c.index !== parseInt(data)))

        // Доделать
        // canvasState.setDelCanvasList(canvasState.getCanvasList().filter(c => parseInt(c.attributes[1].value) !== data))
    }

    /* Скрыть/Показать */
    const Visable = (data) => {
        canvasState.getCanvasList().find(c => parseInt(c.attributes[1].value) === parseInt(data.index)).style.visibility = data.visable ? 'visible' : 'hidden'
    }

    /* Очистка слоя */
    const Clear = (data) => {
        canvasState.getCanvasList().find(c => parseInt(c.attributes[1].value) === parseInt(data)).getContext("2d").clearRect(0, 0, width, height)
    }

    // get width and height

    const Width = (e) => {
        setWidth(e)
    }
    const Height = (e) => {
        setHeight(e)
    }


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
                        <Canvas
                            mergeRes={mergeRes}
                            canvasDate={canvasList}
                            labelData={resLabel}
                            width={width}
                            height={height}
                        />
                    </div>
                    <div className={[cl.col, cl.block].join(" ")} style={{ padding: "0 0 0 5px" }}>
                        <div className={[cl.row, cl.canvas__button].join(" ")} style={{ gap: "9px", paddingTop: "10vh" }}>
                            <BabylonModule />
                            <Link className={cl.link} to='/Pay'>
                                <span className={cl.subscribe__txt}> Подписка</span>
                            </Link>
                        </div>
                        <LableBar
                            width={Width}
                            height={Height}
                            mergeCanvas={Merge}
                            deleteCanva={DeleteCanva}
                            Clear={Clear}
                            Visable={Visable}
                            canva={label}
                            newCanva={AddNewcanva}
                        />
                    </div>


                    {/*<ScaleField />*/}
                    {/* <GenBlock /> */}
                </div>



                {/* <GraphicTable /> */}



            </div>
        </div>
    );
};

export default Drawing;