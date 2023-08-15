import React from 'react';
import cl from './Canvas.module.css'
const Canvas = (props) => {
    // let background ="url(alpha_pattern.png)";
    let background =props.drawingsArr[0];

    return (
        <div className={cl.d_frame} id="d_frame">
            <div className={cl.v_frame} id="v_frame">   
                {/* рамка */}

                {/* <canvas className={cl.drawfield} id="canvas_additional" style={{ zIndex: 10 }}></canvas>
                <canvas className={cl.drawfield} id="canvas_foreground" style={{ zIndex: 9 }}></canvas>
                <canvas className={cl.drawfield} id="canvas_background" style={{ zIndex: 8 }}></canvas> */}

                <div className={cl.drawfield} id="alpha_img" style={{ zIndex: 7, background: background, backgroundRepeat: "repeat" }}></div>
                {/* рисунок */}
            </div>
        </div>
    );
};

export default Canvas;