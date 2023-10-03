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
      {/* <NavLink tag={Link} to="../" className={cl.logo}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="59"
          height="44"
          viewBox="0 0 59 44"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.152152 21.8485L3.79586 10.3149C4.0953 9.36745 4.80876 8.60737 5.73764 8.2479L26.4724 0.222174C27.2576 -0.0824649 28.13 -0.0733257 28.9091 0.246546L50.8096 9.24102C51.5139 9.53043 52.0959 10.0544 52.4534 10.7246L58.6134 22.2263C59.0152 22.9772 59.1083 23.8546 58.8715 24.671L56.7266 32.1027C56.5417 32.7409 56.1674 33.3091 55.651 33.731L48.3896 39.6516C48.3453 39.6882 48.2995 39.7232 48.2536 39.7567L43.2731 43.3987C41.805 44.4726 40.181 44.0324 38.6746 42.6782L35.0553 39.28C34.985 39.183 34.9199 39.0956 34.8591 39.017L38.7296 36.5108C39.5118 36.0051 40.0084 35.1841 40.0924 34.258C40.1749 33.3456 39.8479 32.4637 39.191 31.827L36.2504 28.1675L43.3402 29.1324L45.7716 24.1116C46.1312 24.2198 46.5127 24.278 46.9077 24.278C49.0753 24.278 50.8325 22.5261 50.8325 20.3649C50.8325 18.2038 49.0753 16.4519 46.9077 16.4519C44.7401 16.4519 42.9829 18.2038 42.9829 20.3649C42.9829 21.6974 43.6509 22.8743 44.6712 23.581L42.6252 27.8042L35.1417 26.7876L33.7479 25.0531L38.7098 22.0511L36.7876 15.3496C38.1286 14.7273 39.0581 13.3719 39.0581 11.8C39.0581 9.63891 37.3009 7.88695 35.1333 7.88695C32.9657 7.88695 31.2085 9.63891 31.2085 11.8C31.2085 13.9612 32.9657 15.7131 35.1333 15.7131C35.2952 15.7131 35.4549 15.7034 35.6117 15.6844L37.2783 21.4921L32.9772 24.094L24.2901 13.283C24.9263 12.5875 25.3143 11.6624 25.3143 10.6469C25.3143 8.48578 23.5571 6.73383 21.3895 6.73383C19.2219 6.73383 17.4647 8.48578 17.4647 10.6469C17.4647 12.8081 19.2219 14.56 21.3895 14.56C22.0983 14.56 22.7632 14.3727 23.3371 14.045L30.1112 22.4752L20.3384 22.9269L15.7144 20.7367C15.8185 20.3851 15.8743 20.0129 15.8743 19.6278C15.8743 17.4666 14.1171 15.7147 11.9495 15.7147C9.78186 15.7147 8.02466 17.4666 8.02466 19.6278C8.02466 21.7889 9.78186 23.5408 11.9495 23.5408C13.2949 23.5408 14.4822 22.8659 15.1893 21.8371L20.0894 24.1577L31.0562 23.6511L38.2637 32.6206L38.3217 32.6831C38.725 33.0639 38.9282 33.597 38.8778 34.1484C38.8274 34.6998 38.5325 35.1887 38.0666 35.4903L31.592 39.6826L29.0482 40.9844C28.3042 41.3652 27.4425 41.4475 26.6404 41.2175L13.627 37.4704C12.4338 37.1262 11.537 36.1407 11.3109 34.9221L10.6479 31.3441C10.4538 30.2992 9.76328 29.4127 8.79468 28.9679L1.90907 25.8058C0.408816 25.1173 -0.344369 23.4235 0.152152 21.8516V21.8485ZM29.7845 36.0082C30.4399 36.0051 31.0708 35.798 31.5628 35.4187C32.8323 34.4393 34.4915 32.383 29.0771 30.7105C21.6919 28.4303 21.8065 32.3784 21.8065 32.3784C21.8065 32.3784 21.9241 36.0508 29.7845 36.0082Z"
            fill="url(#paint0_linear_8_37)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_8_37"
              x1="-0.000623482"
              y1="21.9993"
              x2="59.0014"
              y2="21.9993"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#312782" />
              <stop offset="1" stop-color="#E5007E" />
            </linearGradient>
          </defs>
        </svg>
      </NavLink> */}

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
