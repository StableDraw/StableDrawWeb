import React from 'react';

const SwapLayers = () => {
    let input_value = swap_layers_in_stack(pstack);
    pstack = input_value[0];
    alert(pstack);
    console.log(pstack);

    if (input_value[1] == false) {
        return;
    }
    input_value = swap_layers_in_stack(nstack);
    nstack = input_value[0];
    replay_actions(pstack);
    ctx_layer_1.clearRect(0, 0, lwW, lwH);
    canvas_to_layer(canvas_foreground, ctx_layer_1);
    ctx_layer_2.clearRect(0, 0, lwW, lwH);
    canvas_to_layer(canvas_background, ctx_layer_2);

<<<<<<< HEAD:Client/ClientApp/src/components/Scripts/LayersFunctions/SwapLayers.jsx

    return (
        <button onClick={SwapLayers} className="layers_mini_button" id="add_layers" title="Добавить слой">
            <img className="layers_mini_button_image" alt="swap.png" src="plus.png"></img>
        </button>
=======
    

    return (
        <div>
            <button onClick={SwapLayers} className="layers_mini_button" id="add_layers" title="Добавить слой">
            <img className="layers_mini_button_image" alt="swap.png" src="plus.png"></img>
            </button>
        </div>
>>>>>>> f1508366e1130bd19519dd6f5339e549472fcd6d:Client/ClientApp/src/components/Main_functions/SwapLayers.jsx
    );
};

export default SwapLayers;