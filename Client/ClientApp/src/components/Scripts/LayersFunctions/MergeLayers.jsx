import React from 'react';

const MergeLayers = () => {
    let merge_elem = merge_layers_in_stack(pstack, local_draw_ctx);
    let return_value = [merge_elem[1], []];
    pstack = merge_elem[0];
    if (return_value[0].length == 0) {
        return_value[1] = [];
        return return_value;
    }
    merge_elem = merge_layers_in_stack(nstack, local_draw_ctx);
    return_value[1] = merge_elem[1];
    nstack = merge_elem[0];
    replay_actions(pstack);
    if (local_draw_ctx == ctx_foreground) {
        ctx_layer_2.clearRect(0, 0, lwW, lwH);
        canvas_to_layer(canvas_foreground, ctx_layer_1);
    }
    else {
        ctx_layer_1.clearRect(0, 0, lwW, lwH);
        canvas_to_layer(canvas_background, ctx_layer_2);
    }
    return return_value;
    return (
        <div>

        </div>
    );
};

export default MergeLayers;