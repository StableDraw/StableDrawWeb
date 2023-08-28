import React from 'react';

const GenPictureByDrawing = () => {
    console.log(original_image_buf);
    let is_depth = params[1];
    let is_inpainting = params[2];
    let is_upscale = params[3];
    let is_upscale_xX = params[4];
    blackout.style.display = "block";
    blackout1.style.display = "block";
    let send_data_pbp;
    let foreground_data;
    let { local_is_foreground_used, local_is_background_used, local_is_drawing, local_sure, local_how_many_prims, local_how_many_dots } = data_prop;
    if (is_human_caption) {
        let background_data;
        if (original_image_buf == "") {
            if (!is_foreground_visible && !is_background_visible) {
                alert("Выключены оба слоя, вы не можете отправить изображение");
                return;
            }
            if (local_is_foreground_used && is_foreground_visible) {
                foreground_data = canvas_foreground.toDataURL("imag/png");
            }
            else {
                foreground_data = "";
            }
            if (local_is_background_used && is_background_visible) {
                background_data = canvas_background.toDataURL("imag/png");
            }
            else {
                background_data = "";
            }
        }
        else {
            if (is_inpainting) {
                foreground_data = canvas_foreground.toDataURL("imag/png");
                background_data = original_image_buf;
            }
            else {
                foreground_data = original_image_buf;
                background_data = "";
            }
        }
        if (chain_id != "") {
            if (!is_inpainting) {
                foreground_data = "";
            }
            background_data = "";
        }
        send_data_pbp = JSON.stringify({
            "type": 'g',
            "is_human_caption": true,
            "is_depth": is_depth,
            "is_inpainting": is_inpainting,
            "is_upscale": is_upscale,
            "is_upscale_xX": is_upscale_xX,
            "chain_id": chain_id,
            "task_id": task_id,
            "foreground": foreground_data,
            "backgroung": background_data,
            "prompt": full_prompt,
            "is_drawing": local_is_drawing,
            "sure": local_sure,
            "prims_count": local_how_many_prims,
            "dots_count": local_how_many_dots,
            "img_name": last_task_image_name,
            "img_suf": last_task_image_suffix
        });
        /*send_data_pbp = JSON.stringify({
            "type": 'g', //рисунок
            "is_human_caption": true,
            "is_depth": is_depth,
            "is_inpainting": is_inpainting,
            "is_upscale": is_upscale,
            "chain_id": chain_id, //id последнего звена цепочки
            "task_id": task_id, //id задания
            "foreground": foreground_data,
            "backgroung": background_data,
            "prompt": full_prompt, //описание изображения
            "img_name": last_task_image_name,
            "img_suf": last_task_image_suffix
        })*/
    }
    else {
        send_data_pbp = JSON.stringify({
            "type": 'g',
            "is_human_caption": false,
            "prompt": full_prompt,
            "is_depth": is_depth,
            "is_upscale": is_upscale,
            "is_upscale_xX": is_upscale_xX,
            "chain_id": chain_id,
            "task_id": task_id,
            "img_name": last_task_image_name,
            "img_suf": last_task_image_suffix
        });
    }
    ws.send(send_data_pbp);
    return (
        <div>

        </div>
    );
};

export default GenPictureByDrawing;