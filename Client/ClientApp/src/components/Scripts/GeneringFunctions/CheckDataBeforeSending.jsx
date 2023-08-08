import React from 'react';

const CheckDataBeforeSending = () => {
    let local_is_foreground_used = false;
    let local_is_background_used = false;
    let local_is_drawing_on_foreground = true;
    let local_is_drawing_on_background = true;
    let local_sure_on_foreground = true;
    let local_sure_on_background = true;
    let local_how_many_prims_on_foreground = 0;
    let local_how_many_dots_on_foreground = 0;
    let local_how_many_prims_on_background = 0;
    let local_how_many_dots_on_background = 0;
    for (let i = 0; i < pstack.length; i++) {
        switch (pstack[i][0]) {
            case 'p':
                if (pstack[i][1] == ctx_foreground) {
                    if (local_is_drawing_on_foreground == false && local_sure_on_foreground == true) {
                        local_sure_on_foreground = false;
                    }
                    local_is_drawing_on_foreground = true;
                    local_is_foreground_used = true;
                    local_how_many_prims_on_foreground++;
                    local_how_many_dots_on_foreground += pstack[i][2].length;
                }
                else {
                    if (local_is_drawing_on_background == false && local_sure_on_background == true) {
                        local_sure_on_background = false;
                    }
                    local_is_drawing_on_background = true;
                    local_is_background_used = true;
                    local_how_many_prims_on_background++;
                    local_how_many_dots_on_background += pstack[i][2].length;
                }
                break;
            case 'f':
                if (pstack[i][1] == ctx_foreground) {
                    if (local_is_drawing_on_foreground == false && local_sure_on_foreground == true) {
                        local_sure_on_foreground = false;
                    }
                    local_is_drawing_on_foreground = true;
                    local_is_foreground_used = true;
                    local_how_many_prims_on_foreground++;
                }
                else {
                    if (local_is_drawing_on_background == false && local_sure_on_background == true) {
                        local_sure_on_background = false;
                    }
                    local_is_drawing_on_background = true;
                    local_is_background_used = true;
                    local_how_many_prims_on_background++;
                }
                break;
            case 'd':
                local_is_foreground_used = false;
                local_is_background_used = false;
                local_is_drawing_on_foreground = true;
                local_is_drawing_on_background = true;
                local_sure_on_foreground = true;
                local_sure_on_background = true;
                local_how_many_prims_on_foreground = 0;
                local_how_many_dots_on_foreground = 0;
                local_how_many_prims_on_background = 0;
                local_how_many_dots_on_background = 0;
                break;
            case 'i':
                if (pstack[i][2] == "#fff") {
                    if (pstack[i][1] == ctx_foreground) {
                        local_is_foreground_used = false;
                        local_is_drawing_on_foreground = true;
                        local_sure_on_foreground = true;
                        local_how_many_prims_on_foreground = 0;
                        local_how_many_dots_on_foreground = 0;
                    }
                    else {
                        local_is_background_used = false;
                        local_is_drawing_on_background = true;
                        local_sure_on_background = true;
                        local_how_many_prims_on_background = 0;
                        local_how_many_dots_on_background = 0;
                    }
                }
                else {
                    if (pstack[i][1] == ctx_foreground) {
                        local_sure_on_foreground = true;
                        local_is_drawing_on_foreground = true;
                        local_is_foreground_used = true;
                        local_how_many_prims_on_foreground++;
                        local_how_many_prims_on_foreground = 0;
                        local_how_many_dots_on_foreground = 0;
                    }
                    else {
                        local_sure_on_background = false;
                        local_is_drawing_on_background = true;
                        local_is_background_used = true;
                        local_how_many_prims_on_background++;
                        local_how_many_prims_on_background = 0;
                        local_how_many_dots_on_background = 0;
                    }
                }
                break;
            case 'c':
                if (pstack[i][1] == ctx_foreground) {
                    local_is_foreground_used = false;
                    local_is_drawing_on_foreground = true;
                    local_sure_on_foreground = true;
                    local_how_many_prims_on_foreground = 0;
                    local_how_many_dots_on_foreground = 0;
                }
                else {
                    local_is_background_used = false;
                    local_is_drawing_on_background = true;
                    local_sure_on_background = true;
                    local_how_many_prims_on_background = 0;
                    local_how_many_dots_on_background = 0;
                }
                break;
            case 'u':
                if (pstack[i][1] == ctx_foreground) {
                    if (local_is_drawing_on_foreground == true && local_sure_on_foreground == true) {
                        local_sure_on_foreground = false;
                    }
                    local_is_drawing_on_foreground = false;
                    local_is_foreground_used = true;
                    local_how_many_prims_on_foreground = 0;
                    local_how_many_dots_on_foreground = 0;
                }
                else {
                    if (local_is_drawing_on_background == true && local_sure_on_background == true) {
                        local_sure_on_background = false;
                    }
                    local_is_drawing_on_background = false;
                    local_is_background_used = true;
                    local_how_many_prims_on_background = 0;
                    local_how_many_dots_on_background = 0;
                }
                break;
            default:
                break;
        }
    }
    let local_is_drawing;
    let local_sure;
    let local_how_many_prims;
    let local_how_many_dots;
    if (!local_is_foreground_used) {
        local_how_many_prims_on_foreground = 0;
        local_how_many_dots_on_foreground = 0;
        local_sure_on_foreground = true;
        local_is_drawing_on_foreground = true;
    }
    if (!local_is_background_used) {
        local_how_many_prims_on_background = 0;
        local_how_many_dots_on_background = 0;
        local_sure_on_background = true;
        local_is_drawing_on_background = true;
    }
    if (local_sure_on_foreground && local_sure_on_background) {
        local_sure = true;
    }
    else {
        local_sure = false;
    }
    if (local_is_drawing_on_foreground && !local_is_drawing_on_background) {
        local_is_drawing = true;
        local_sure = false;
    }
    else {
        if (!local_is_drawing_on_foreground && local_is_drawing_on_background) {
            local_is_drawing = false;
            local_sure = false;
        }
        else {
            if (local_is_drawing_on_foreground && local_is_drawing_on_background) {
                local_is_drawing = true;
            }
            else {
                local_is_drawing = false;
            }
        }
    }
    local_how_many_prims = local_how_many_prims_on_foreground + local_how_many_prims_on_background;
    local_how_many_dots = local_how_many_dots_on_foreground + local_how_many_dots_on_background;
    if (local_how_many_prims == 0) {
        local_is_drawing = false;
        local_sure = true;
    }
    return { local_is_foreground_used, local_is_background_used, local_is_drawing, local_sure, local_how_many_prims, local_how_many_dots };
    return (
        <div>

        </div>
    );
};

export default CheckDataBeforeSending;