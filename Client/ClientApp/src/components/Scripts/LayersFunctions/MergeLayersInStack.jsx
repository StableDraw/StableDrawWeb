import React from 'react';

const MergeLayersInStack = () => {
    let substack_1 = [];
    let substack_2 = [];
    let is_changed_stack = [];
    let another_ctx;
    let is_foreground;
    let return_value;
    if (local_ctx == ctx_foreground) {
        another_ctx = ctx_background;
        is_foreground = true;
    }
    else {
        another_ctx = ctx_foreground;
        is_foreground = false;
    }
    for (let i = 0; i < stack.length; i++) {
        if (id_list.includes(stack[i][0]) && stack[i][1] == another_ctx) {
            stack[i][1] = local_ctx;
            substack_1.push(stack[i]);
            is_changed_stack.push(true);
        }
        else {
            substack_2.push(stack[i]);
            is_changed_stack.push(true);
        }
    }
    if (is_foreground) {
        if (substack_1.length === 0) {
            return_value = [stack, []];
            return return_value;
        }
        return_value = [substack_1.concat(substack_2), is_changed_stack];
        return return_value;
    }
    else {
        if (substack_2.length === 0) {
            return_value = [stack, []];
            return return_value;
        }
        return_value = [substack_2.concat(substack_1), is_changed_stack];
        return return_value;
    }
    return (
        <div>

        </div>
    );
};

export default MergeLayersInStack;