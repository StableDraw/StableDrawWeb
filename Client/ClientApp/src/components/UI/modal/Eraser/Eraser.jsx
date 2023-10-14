import {React, useState} from 'react';
import cl from './Eraser.module.css'
import MyInput from '../../MyInput/MyInput';
import toolState from "../../../../store/toolState";
import canvasState from "../../../../store/canvasState";
import Erar from "../../../../tools/Eraser"

const Eraser = ({active, activeBtn, getRes,}) => {
    const [modal, setModal] = useState(false)
    const rootClass = [cl.myModal]
    
    if(active==='eraser') {
        if(modal) {
            rootClass.push(cl.up_add_window)
        }
    }
    
    const Eraser = () => {
        toolState.setTool(new Erar(canvasState.canvas))
        activeBtn('eraser')
        setModal(!modal)
    }
    return (
            <a className={cl.el}
               visible={modal}
               onClick={Eraser}
               setVisible={setModal}
               variant="contained" title={'Ластик'}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <g clip-path="url(#clip0_42_440)">
                        <path d="M37.5435 36.6932H20.9417L27.6728 29.5154L27.676 29.5124L27.6789 29.5089L38.6399 17.8208C39.5109 16.8898 40 15.6284 40 14.3134C40 12.9983 39.5109 11.7369 38.6399 10.8059L29.8688 1.45279C28.9964 0.522582 27.8133 0 26.5796 0C25.3459 0 24.1627 0.522582 23.2904 1.45279L12.3283 13.1422L12.3263 13.1441L12.3245 13.1463L1.3624 24.8357C0.490067 25.766 0 27.0276 0 28.3432C0 29.6587 0.490067 30.9204 1.3624 31.8506L8.55084 39.5158C8.84167 39.8258 9.23607 40 9.6473 40H37.5435C37.9547 40 38.3491 39.8258 38.6399 39.5157C38.9306 39.2057 39.094 38.7851 39.094 38.3466C39.094 37.9081 38.9306 37.4875 38.6399 37.1774C38.3491 36.8674 37.9547 36.6932 37.5435 36.6932ZM25.4833 3.79122C25.6272 3.63766 25.7981 3.51583 25.9862 3.43272C26.1743 3.3496 26.376 3.30683 26.5796 3.30683C26.7832 3.30683 26.9848 3.3496 27.1729 3.43272C27.361 3.51583 27.5319 3.63766 27.6758 3.79122L36.447 13.1443C36.7373 13.4547 36.9004 13.8751 36.9004 14.3135C36.9004 14.7518 36.7373 15.1723 36.447 15.4826L26.5796 26.0047L15.6158 14.3135L25.4833 3.79122Z" fill="#656565"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_42_440">
                            <rect width="40" height="40" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <div className={rootClass.join(' ')} id="eraser_window">
                    <MyInput width={toolState.width} id='eraser'  imgPath={"thickness.png"} type={'thickness'} imgClass={cl.thicknessimg}/>
                </div>
            </a>
    );
};

export default Eraser;