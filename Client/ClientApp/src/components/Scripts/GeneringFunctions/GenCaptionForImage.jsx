import React from 'react';

const GenCaptionForImage = () => {
    blackout.style.display = "block";
    blackout1.style.display = "block";
    let send_data_cpt;
    let data;
    let background_data;
    let { local_is_foreground_used, local_is_background_used, local_is_drawing, local_sure, local_how_many_prims, local_how_many_dots } = data_prop;
    if (original_image_buf == "") {
        if (local_is_foreground_used && is_foreground_visible) {
            data = canvas_foreground.toDataURL("imag/png");
        }
        else {
            data = canvas_background.toDataURL("imag/png");
        }
    }
    else {
        data = original_image_buf;
    }
    if (local_is_background_used && is_background_visible) {
        background_data = canvas_background.toDataURL("imag/png");
    }
    else {
        background_data = "";
    }
    send_data_cpt = JSON.stringify({
        "type": 'd',
        "chain_id": chain_id,
        "task_id": task_id,
        "data": data,
        "backgroung": background_data,
        "is_drawing": local_is_drawing,
        "sure": local_sure,
        "prims_count": local_how_many_prims,
        "dots_count": local_how_many_dots,
        "img_name": last_task_image_name,
        "img_suf": last_task_image_suffix
    });
    /*
    send_data = JSON.stringify({
        "type": 'd', //просьба сгенерировать описание изображения
        "chain_id": chain_id, //id последнего звена цепочки
        "task_id": task_id, //id задания
        "data": data,
        "backgroung": background_data,
        "img_name": last_task_image_name,
        "img_suf": last_task_image_suffix
    })*/
    ws.send(send_data_cpt);
    return (
        <div>

        </div>
    );
};

export default GenCaptionForImage;