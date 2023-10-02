import { React, useState } from "react";
import SideBar from "./UI/SideBar/SideBar.jsx";
import LableBar from "./UI/LableBar/LableBar.jsx";
import ScaleField from "./UI/ScaleField/ScaleField.jsx";
import GenBlock from "./UI/modal/GenBlock.jsx";
import Canvas from "./UI/canvas/Canvas.jsx";
import GraphicTable from "./UI/modal/GraphicTable.jsx";
import ToolBar from "./UI/Toolbar/ToolBar.jsx";
import PayModule from "./UI/payModule/PayBtn.jsx";
import BabylonModule from "./UI/BabylonModule/BabylonBtn.jsx";
import ToolOptionsBar from "./UI/ToolOptionsBar/ToolOptionsBar.jsx";
import GenerateModule from "./UI/DELETETHISSHI/GenerationBtn/GenerationBtn.jsx";
import canvasState from "../store/canvasState";
import cl from "./Drawing.module.scss";
import CanvasState from "../store/canvasState";
import GenerateWindow from "../components/UI/GenerateWindow/GenerateBtn/GenerateBtn.jsx";
const Drawing = () => {
  const [label, setLabel] = useState();
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(640);

  const resLabel = (res) => {
    setLabel(res);
  };

  /*Canvas STATE*/
  const [canvasList, setCanvasList] = useState([
    {
      id: Date.now(),
      index: 0,
      style: {
        zIndex: 0,
        position: "absolute",
        backgroundColor: "white",
        touchAction: "none",
        userSelect: "none",
      },
    },
  ]);

  const [mergeRes, setMergeRes] = useState(null);

  const Merge = (data) => {
    setMergeRes(data);
    // console.log(CanvasState.getCanvas())
  };

  /* Добавление канваса */
  const AddNewcanva = (newCanva) => {
    setCanvasList([...canvasList, newCanva]);
  };

  /* Удаление канваса */
  const DeleteCanva = (data) => {
    // пожарный случай    Setcanvas(canvas.filter(c => canvasState.getCanvasList() !== c.find(item => item.attributes[1].value === приходные данные index canvas)))
    setCanvasList(canvasList.filter((c) => c.index !== parseInt(data)));

    // Доделать
    // canvasState.setDelCanvasList(canvasState.getCanvasList().filter(c => parseInt(c.attributes[1].value) !== data))
  };

  /* Скрыть/Показать */
  const Visable = (data) => {
    canvasState
      .getCanvasList()
      .find(
        (c) => parseInt(c.attributes[1].value) === parseInt(data.index)
      ).style.visibility = data.visable ? "visible" : "hidden";
  };

  /* Очистка слоя */
  const Clear = (data) => {
    canvasState
      .getCanvasList()
      .find((c) => parseInt(c.attributes[1].value) === parseInt(data))
      .getContext("2d")
      .clearRect(0, 0, width, height);
  };

  // get width and height

  const Width = (e) => {
    setWidth(e);
    console.log(width);
  };
  const Height = (e) => {
    setHeight(e);
  };

  return (
    <div>
      <div className={cl.main}>
        {/*<SideBar light={{item: '1', bla: 2}}/>*/}

        <ToolBar />
        {/*<h1>
                        <span style={{textDecoration: 'underline', margin: 80, color: 'rgba(204,32,32,0.8)'}}>
                            <span style={{color: 'rgba(83,107,234,0.9)', fontWeight: "bold" }}>S
                            </span>table Drawing
                        </span>
                    </h1>*/}
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
              width={`${width}px`}
              height={`${height}px`}
            />
          </div>
          <div
            className={[cl.col, cl.block].join(" ")}
            style={{ padding: "0 0 0 5px" }}
          >
            <div
              className={[cl.row, cl.canvas__button].join(" ")}
              style={{ gap: "9px", paddingTop: "10vh" }}
            >
              <BabylonModule />
              <PayModule />
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
          <GenBlock />
        </div>

        <GraphicTable />
      </div>
    </div>
  );
};

export default Drawing;
