import React from 'react';

const GenPictureByPrompt = () => {
    blackout.style.display = "block";
    blackout1.style.display = "block";
    let local_type;
    let send_data_pbt;
    send_data_pbt = JSON.stringify({
        "type": "t",
        "prompt": full_prompt //описание изображения
    });
    ws.send(send_data_pbt);
    return (
        <div>

        </div>
    );
};

export default GenPictureByPrompt;