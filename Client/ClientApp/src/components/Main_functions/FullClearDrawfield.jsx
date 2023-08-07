import React from 'react';

const FullClearDrawfield = () => {
    original_image_buf = "";
    before_gen_block.style.display = "none";
    cur_background_clr = "#fff";
    ctx_background.fillStyle = cur_background_clr;
    ctx_foreground.clearRect(0, 0, cW, cH);
    ctx_background.clearRect(0, 0, cW, cH);
    return (
        <div>

        </div>
    );
};

export default FullClearDrawfield;