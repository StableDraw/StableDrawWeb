import React from 'react';

const Upscale = () => {
    blackout.style.display = "block";
    blackout1.style.display = "block";
    let data = original_image_buf;
    if (chain_id != "") {
        data = "";
    }
    let send_data_ups = JSON.stringify({
        "type": 'a',
        "data": data,
        "chain_id": chain_id,
        "task_id": task_id,
        "img_name": last_task_image_name,
        "img_suf": last_task_image_suffix
    });
    ws.send(send_data_ups);
    return (
        <div>

        </div>
    );
};

export default Upscale;