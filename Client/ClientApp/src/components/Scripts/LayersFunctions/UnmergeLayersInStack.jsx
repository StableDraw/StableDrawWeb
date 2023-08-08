import React from 'react';

const UnmergeLayersInStack = () => {
    if (local_ics.length == 0) {
        return stack;
    }
    let substack_1 = [];
    let substack_2 = [];
    let another_ctx;
    let is_foreground;
    if (local_ctx == ctx_foreground) {
        another_ctx = ctx_background;
        is_foreground = true;
    }
    else {
        another_ctx = ctx_foreground;
        is_foreground = false;
    }
    for (let i = 0; i < stack.length; i++) {
        if (local_ics[i] == true) {
            stack[i][1] = another_ctx;
            substack_1.push(stack[i]);
        }
        else {
            substack_2.push(stack[i]);
        }
    }
    if (is_foreground) {
        return substack_1.concat(substack_2);
    }
    else {
        return substack_2.concat(substack_1);
    }
    return (
        <div>

        </div>
    );
};

export default UnmergeLayersInStack;