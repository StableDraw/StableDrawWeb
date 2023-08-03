import React from 'react';

const GenBlock = () => {
    return (
        <div id="before_gen_block" style={{ position: "fixed", top: "50px", left: "5%", height: "20%", width: "20%", border: "2px solid #111111", zIndex: "15", display: "none" }}>
            <div className="closebtn" id="close_before_gen_block" style={{ position: "absolute", zIndex: "16", right: "-2px", top: "-2px", width: "20px", height: "20px", cursor: "pointer", textAlign: "center", background: "#ffffff", border: "2px solid #111111" }}>
                <a style={{ position: "relative", fontSize: "25px", top: "-80%", verticalAlign: "middle", textAlign: "center", height: "100%", width: "100%", display: "block" }}>
                    &times;
                </a>
            </div>
            <canvas id="before_gen" style={{ position: "relative", width: "100%", height: "100%", cursor: "pointer" }}></canvas>
        </div>
    );
};

export default GenBlock;