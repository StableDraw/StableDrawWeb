import React from 'react';

const UndoAction = () => {
    let pstack_size = pstack.length;
    if (pstack_size != 0) {
        let cur_act = pstack.pop();
        let is_r = false;
        if (id_list.includes(cur_act[0])) {
            if (cur_act[0] == 'r') {
                is_r = true;
            }
        }
        pstack_size--;
        nstack.push(cur_act);
        if (cur_act[0] == 's') {
            swap_layers();
            return;
        }
        else {
            if (cur_act[0] == 'm') {
                unmerge_layers(cur_act[1], cur_act[2], cur_act[3]);
                return;
            }
        }
        if (is_r) {
            let buf_r_elem = ['r', fW_max, fH_max, false];
            for (let i = pstack_size - 1; i > -1; i--) {
                if (pstack[i][0] == 'r') {
                    buf_r_elem = pstack[i];
                    break;
                }
            }
            change_drawfield_size(buf_r_elem[1], buf_r_elem[2]);
            cur_ratio_val = get_visual_ratio(buf_r_elem[3], cW, cH);
            ratio_field.value = cur_ratio_val;
        }
        replay_actions(pstack);
        ctx_layer_1.clearRect(0, 0, lwW, lwH);
        canvas_to_layer(canvas_foreground, ctx_layer_1);
        ctx_layer_2.clearRect(0, 0, lwW, lwH);
        canvas_to_layer(canvas_background, ctx_layer_2);
    }
    return (
        <div>

        </div>
    );
};

export default UndoAction;