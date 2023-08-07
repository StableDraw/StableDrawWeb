import React from 'react';

const PushActionToStack = () => {
    let need_add = true;
    let pstack_length = pstack.length - 1;
    if (pstack_length != -1 && pstack[pstack_length][0] == local_act[0] && local_act[0] != 'p' && local_act[0] != 'u' && pstack[pstack_length] == local_act) {
        need_add = false;
    }
    if (need_add) {
        pstack.push(local_act);
        nstack = [];
    }
    return (
        <div>

        </div>
    );
};

export default PushActionToStack;