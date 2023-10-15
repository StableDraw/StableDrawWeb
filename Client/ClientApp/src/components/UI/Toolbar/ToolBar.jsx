import React, { useState } from "react";
import cl from "./ToolBar.module.scss";
import Pencil from "../modal/Pencil/Pencil";
import Eraser from "../modal/Eraser/Eraser";
import ColorPalete from "../modal/ColorPalete/ColorPalete";
import Bucket from "../modal/Bucket/Bucket";
import ClearPane from "../modal/ClearPane/ClearPane";
import { NavLink } from "reactstrap";
import { Home } from "../../Home";
import { Link } from "react-router-dom";
import toolState from "../../../store/toolState";

const ToolBar = () => {
  const [activeBtn, setActiveBtn] = useState(null);

  const [color, setColor] = useState("#000000");
  const ResColor = (e) => {
    e.preventDefault();
    setColor(e.target.value);
    toolState.setStrokeColor(e.target.value);
    toolState.setFillColor(e.target.value);
  };
  return (
    <div className={cl.nav}>
      <Pencil activeBtn={setActiveBtn} active={activeBtn} />

      {/*eraser*/}
      <Eraser activeBtn={setActiveBtn} active={activeBtn} />

      <label className={cl.el}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 15C15.4477 15 15 15.4477 15 16V47C15 47.5523 15.4477 48 16 48H47C47.5523 48 48 47.5523 48 47V16C48 15.4477 47.5523 15 47 15H16ZM43.2856 19.7143H19.7142V43.2857H43.2856V19.7143Z"
            fill="#656565"
          />
          <path
            d="M47 16L16 47"
            stroke="#CE3E3E"
            stroke-width="2"
            stroke-linecap="round"
          />
          <rect width="33" height="33" rx="1" fill={color} />
        </svg>
        <input
          className={cl.input__hidden}
          type="color"
          onChange={(e) => ResColor(e)}
        />
      </label>

      {/*bucket*/}
      {/*<Bucket/>*/}
      <ClearPane />

      <div className="old__version" style={{ display: "none" }}>
        <Pencil activeBtn={setActiveBtn} active={activeBtn} />
        <Eraser activeBtn={setActiveBtn} active={activeBtn} />
        <ColorPalete activeBtn={setActiveBtn} active={activeBtn} />
        <Bucket />
        <ClearPane />
        {/*<GenerateButton />*/}
      </div>
    </div>
  );
};

export default ToolBar;
