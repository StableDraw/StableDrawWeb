import React from 'react';

const UnmergeLayers = () => {
    pstack = unmerge_layers_in_stack(pstack, local_ctx, local_ics_1);
    nstack = unmerge_layers_in_stack(nstack, local_ctx, local_ics_2);
    replay_actions(pstack);
    ctx_layer_1.clearRect(0, 0, lwW, lwH);
    canvas_to_layer(canvas_foreground, ctx_layer_1);
    ctx_layer_2.clearRect(0, 0, lwW, lwH);
    canvas_to_layer(canvas_background, ctx_layer_2);
    return (
        <div>

        </div>
    );
};

export default UnmergeLayers;