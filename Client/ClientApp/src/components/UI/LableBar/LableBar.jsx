import React, { useState } from "react";
import Merge from "./LableBar.utils/Merge";
import Add from "./LableBar.utils/Add";
import cl from "./LableBar.module.scss";
import ListLayers from "../layer/ListLayers/ListLayers.jsx";
import CanvasState from "../../../store/canvasState";

const LableBar = (props) => {
  const [layers, SetLayer] = useState([{ id: Date.now(), index: 0 }]);
  const AddNewlabels = (newLayer) => {
    SetLayer([...layers, newLayer]);
  };
  const Removelabels = (layer) => {
    SetLayer(layers.filter((l) => l.id !== layer.id));
  };

  // new logic
  const [range, setRange] = useState(0);
  const Grad = (e) => {
    e.preventDefault();
    CanvasState.canvas.style.opacity = 1 - e.target.value / 100;
    setRange(e.target.value);
  };
  const DefaultOpacity = (value) => {
    if (value === (0 || "")) {
      setRange(0);
    } else {
      setRange(100 - value * 100);
    }
    // console.log(CanvasState.getCanvasList())
  };

  return (
    <div className={cl.layers}>
      <label
        className={cl.opacity__block}
        style={{
          background: `linear-gradient(to right, #93BBE3 ${range}%, #ABABAB 0%)`,
        }}
      >
        <span className={cl.opacity__text}>Прозрачность: {range}%</span>
        <input type="range" style={{ opacity: 0 }} onChange={(e) => Grad(e)} />
      </label>
      <ListLayers
        defOpacity={DefaultOpacity}
        deleteCanva={props.deleteCanva}
        Clear={props.Clear}
        Visable={props.Visable}
        canva={props.canva}
        layers={layers}
        remove={Removelabels}
      />

      <div>
        <div className={cl.scale__block}>
          <input
            className={cl.input__scale}
            onChange={(e) => props.height(e.target.value)}
            defaultValue="640"
            placeholder="Высота"
            type="number"
          />

          <input
            className={cl.input__scale}
            onChange={(e) => props.width(e.target.value)}
            defaultValue="1024"
            placeholder="Ширина"
            type="number"
          />
        </div>
        <div className={cl.layers__button}>
          <div className={cl.left__button_group}>
            {/*<Swap/>*/}

            <Add create={AddNewlabels} canva={props.newCanva} />

            <Merge mergeCanvas={props.mergeCanvas} />

            {/* Swap down */}
            {/* <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 47 47" fill="none">
                                <path d="M33 18L23 30L13 18" stroke="#656565" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button> */}

            {/*Swap up*/}
            {/* <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 47 47" fill="none">
                                <path d="M33 30L23 18L13 30" stroke="#656565" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button> */}
          </div>
          {/*<button className={cl.left__button_group}>*/}
          {/*    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">*/}
          {/*        <g clip-path="url(#clip0_58_294)">*/}
          {/*            <path d="M1 5H19M17 5V19C17 19.5304 16.7893 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 15 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5M6 5V3C6 2.46957 6.21071 1.96086 6.58579 1.58579C6.96086 1.21071 7.46957 1 8 1H12C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V5M8 10V16M12 10V16" stroke="#656565" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>*/}
          {/*        </g>*/}
          {/*        <defs>*/}
          {/*            <clipPath id="clip0_58_294">*/}
          {/*                <rect width="20" height="22" fill="white"/>*/}
          {/*            </clipPath>*/}
          {/*        </defs>*/}
          {/*    </svg>*/}
          {/*</button>*/}
        </div>
      </div>
    </div>
  );
};

export default LableBar;
