import React, { useState } from 'react';
import cl from './ToolBar.module.css';
import Pencil from '../modal/Pencil/Pencil';
import Eraser from '../modal/Eraser/Eraser';
import ColorPalete from '../modal/ColorPalete/ColorPalete';
import ClearPane from '../modal/ClearPane/ClearPane';
import toolState from "../../../store/toolState.tsx";
import Bucket from "../../../tools/Bucket";
import Filling from '../../../toolsMobx/test'
import canvasState from "../../../store/canvasState.tsx";
import Bezie from "../../../toolsMobx/Bezie";



const ToolBar = () => {
    const [activeBtn, setActiveBtn] = useState(null)

    const [color, setColor] = useState('#000000')
    const ResColor = (e) => {
        // e.preventDefault()
        setColor(e.target.value)
        toolState.setStrokeColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }
    const Fill = (e) => {
        e.preventDefault()
        toolState.setTool(new Filling(canvasState.canvas))
    }

    const Bezies = (e) => {
        e.preventDefault()
        toolState.setTool(new Bezie(canvasState.canvas))
    }

    return (

        <div className={cl.nav}>
            <Pencil
                activeBtn={setActiveBtn}
                active={activeBtn}
            />

            {/*brush*/}
            <a className={cl.el} title="Перо" onClick={(e) => Bezies(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                    <g clip-path="url(#clip0_42_456)">
                        <path d="M11.3143 26.2801C7.55795 26.2801 4.52572 29.4808 4.52572 33.4458C4.52572 36.5748 1.9008 38.2229 0 38.2229C2.08183 41.1369 5.63452 43 9.05144 43C14.0524 43 18.1029 38.7245 18.1029 33.4458C18.1029 29.4808 15.0706 26.2801 11.3143 26.2801ZM42.3381 3.89932L39.3059 0.698653C38.4234 -0.232884 36.9978 -0.232884 36.1152 0.698653L15.84 22.1001L22.0629 28.6687L42.3381 7.26718C43.2206 6.33565 43.2206 4.83086 42.3381 3.89932Z" fill="#656565"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_42_456">
                            <rect width="43" height="43" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </a>

            {/*eraser*/}
            <Eraser
                activeBtn={setActiveBtn}
                active={activeBtn}
            />

            <a
                onClick={(e) => Fill(e)}
                className={cl.el}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                    <g clip-path="url(#clip0_42_446)">
                        <path d="M32.3948 22.5411L12.7131 3.66988C11.7816 2.77671 10.2768 2.77671 9.34523 3.66988C8.41369 4.56306 8.41369 6.00588 9.34523 6.89905L13.358 10.7466L1.05694 22.5411C-0.352312 23.8923 -0.352312 26.068 1.05694 27.3963L14.194 39.9923C14.8867 40.6565 15.8182 41 16.7259 41C17.6335 41 18.5651 40.6565 19.2577 39.9923L32.3948 27.3963C33.8041 26.068 33.8041 23.8923 32.3948 22.5411ZM5.28468 24.9687L16.7259 13.9986L28.1671 24.9687H5.28468ZM38.2229 28.4039C38.2229 28.4039 33.4458 33.3737 33.4458 36.4196C33.4458 38.9388 35.5955 41 38.2229 41C40.8503 41 43 38.9388 43 36.4196C43 33.3737 38.2229 28.4039 38.2229 28.4039Z" fill="#656565"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_42_446">
                            <rect width="43" height="43" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </a>
            {/*bucket*/}

            {/*colorpicker*/}
            {/*<a className={cl.el}>*/}
            {/*    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">*/}
            {/*        <g clipPath="url(#clip0_42_443)">*/}
            {/*            <path d="M36.5854 7.87824L30.0778 1.35901C29.2502 0.519081 28.1302 0.0326301 26.9525 0.00158266C25.7748 -0.0294648 24.6308 0.397301 23.7602 1.19246L19.0102 5.95102L15.9464 3.00071C15.725 2.77887 15.4621 2.6029 15.1727 2.48284C14.8834 2.36278 14.5733 2.30099 14.2601 2.30099C13.6277 2.30099 13.0211 2.55268 12.5739 3.00071C12.3524 3.22255 12.1768 3.48592 12.0569 3.77577C11.9371 4.06561 11.8754 4.37627 11.8754 4.69C11.8754 5.32361 12.1266 5.93127 12.5739 6.37929L15.5189 9.44857L2.38501 22.606C1.61732 23.3816 1.13932 24.3981 1.03124 25.4849L0.00998212 35.4065C-0.022012 35.755 0.0231263 36.1063 0.142179 36.4353C0.261232 36.7643 0.451267 37.063 0.69874 37.31C0.920662 37.5305 1.18385 37.7049 1.47322 37.8233C1.76259 37.9418 2.07244 38.0018 2.38501 38H2.59876L12.5026 37.0958C13.5875 36.9876 14.6022 36.5087 15.3764 35.7396L28.629 22.4632L31.5741 25.4136C31.7949 25.6366 32.0576 25.8136 32.347 25.9344C32.6364 26.0552 32.9468 26.1173 33.2603 26.1173C33.5739 26.1173 33.8843 26.0552 34.1737 25.9344C34.4632 25.8136 34.7258 25.6366 34.9466 25.4136C35.1692 25.1924 35.3459 24.9292 35.4665 24.6393C35.5871 24.3493 35.6491 24.0384 35.6491 23.7243C35.6491 23.4102 35.5871 23.0992 35.4665 22.8092C35.3459 22.5193 35.1692 22.2562 34.9466 22.035L32.0016 19.0847L36.7516 14.3261C37.5813 13.4481 38.0296 12.2764 37.9985 11.0678C37.9673 9.85914 37.4592 8.7122 36.5854 7.87824ZM12.0751 32.3373L4.95004 33.0035L5.59129 25.8656L19.0102 12.6844L25.399 19.1085L12.0751 32.3373ZM28.7003 15.6823L22.2402 9.44857L26.7765 4.69L33.2603 11.1854L28.7003 15.6823Z" fill="#656565"/>*/}
            {/*        </g>*/}
            {/*        <defs>*/}
            {/*            <clipPath id="clip0_42_443">*/}
            {/*                <rect width="38" height="38" fill="white"/>*/}
            {/*            </clipPath>*/}
            {/*        </defs>*/}
            {/*    </svg>*/}
            {/*</a>*/}

            {/*palet*/}
            <label className={cl.el}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 15C15.4477 15 15 15.4477 15 16V47C15 47.5523 15.4477 48 16 48H47C47.5523 48 48 47.5523 48 47V16C48 15.4477 47.5523 15 47 15H16ZM43.2856 19.7143H19.7142V43.2857H43.2856V19.7143Z" fill="#656565"/>
                    <path d="M47 16L16 47" stroke="#CE3E3E" stroke-width="2" stroke-linecap="round"/>
                    <rect width="33" height="33" rx="1" fill={color}/>
                </svg>
                <input className={cl.input__hidden} type="color" onChange={(e) => ResColor(e)} />
            </label>

            {/*bucket*/}
            {/*<Bucket/>*/}
            <ClearPane />

            <div className="old__version" style={{ display: "none" }}>
                <Pencil
                    activeBtn={setActiveBtn}
                    active={activeBtn}
                />
                <Eraser
                    activeBtn={setActiveBtn}
                    active={activeBtn}
                />
                <ColorPalete
                    activeBtn={setActiveBtn}
                    active={activeBtn}
                />
                {/*<Bucket />*/}
                <ClearPane />
                {/*<GenerateButton />*/}
            </div>

        </div>

    );
};

export default ToolBar;