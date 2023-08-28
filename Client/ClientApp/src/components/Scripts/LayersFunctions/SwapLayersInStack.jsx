import React from 'react';

const SwapLayersInStack = () => {
    let return_value = [[], false];
    for (let i = 0; i < stack.length; i++) {
        if (id_list.includes(stack[i][0])) {
            return_value[1] = true;
            if (stack[i][1] == ctx_foreground) {
                stack[i][1] = ctx_background;
            }
            else {
                stack[i][1] = ctx_foreground;
            }
        }
    }
    return_value[0] = stack;
    return return_value;
    return (
        <div>

        </div>
    );
};

export default SwapLayersInStack;