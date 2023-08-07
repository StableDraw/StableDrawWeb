import React from 'react';

const RepeatAction = () => {
    if (nstack.length != 0) {
        let cur_act = nstack.pop();
        let local_cur_ctx_layer = cur_ctx_layer;
        let local_cur_canvas = cur_canvas;
        if (id_list.includes(cur_act[0])) {
            if (cur_act[1] == ctx_foreground) {
                local_cur_ctx_layer = ctx_layer_1;
                local_cur_canvas = canvas_foreground;
            }
            else {
                local_cur_ctx_layer = ctx_layer_2;
                local_cur_canvas = canvas_background;
            }
        }
        pstack.push(cur_act);
        if (cur_act[0] == 's') {
            swap_layers();
            return;
        }
        else {
            if (cur_act[0] == 'm') {
                merge_layers(cur_act[1]);
                return;
            }
        }
        if (cur_act[0] == 'r') {
            change_drawfield_size(cur_act[1], cur_act[2]);
            cur_ratio_val = get_visual_ratio(cur_act[3], cW, cH);
            ratio_field.value = cur_ratio_val;
        }
        replay_action(cur_act, orig_f_dW / f_dW, orig_f_dH / f_dH, orig_f_dW, orig_f_dH);
        canvas_to_layer(local_cur_canvas, local_cur_ctx_layer);
    }
    return (
        <div>

        </div>
    );
};

export default RepeatAction;