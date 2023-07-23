import React from 'react';
import cl from "./ListItemC.module.css";

const Canvas = () => {
    return (
        <div className="d_frame" id="d_frame">
            <div className="v_frame" id="v_frame">
                <canvas className={cl.drawfield} id="canvas_additional" style={{ zIndex: 10 }}></canvas>
                <canvas className={cl.drawfield} id="canvas_foreground" style={{ zIndex: 9 }}></canvas>
                <canvas className={cl.drawfield} id="canvas_background" style={{ zIndex: 8 }}></canvas>
                <div className={cl.drawfield} id="alpha_img" style={{ zIndex: 7, backgroundImage: "url(alpha_pattern.png)", backgroundRepeat: "repeat" }}></div>
            </div>
        </div>
    );
};

export default Canvas;