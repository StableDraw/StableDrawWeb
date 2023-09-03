import React, {useState} from 'react';
import cl from './UploadButton.module.css'
import canvasState from '../../../../store/canvasState';
import {  Typography, Input, InputLabel, } from '@mui/material';
const UploadButton = () => {
    const handleFileChange = (event) => {
		let files = [...event.target.files];
		var reader = new FileReader();
        reader.onload = function(event){
            var img = new Image();
            
            img.onload = function(){
                canvasState.getCanvasList().at(-1).getContext("2d", { willReadFrequently: true }).clearRect(0,0, 1080, 732)
                canvasState.getCanvasList().at(-1).getContext("2d", { willReadFrequently: true }).drawImage(img, 0, 0, 1080, 732)
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        // img.src = files[0].toDataURL()
        // img.onload = () => {
        //     canvasState.getCanvas().current.getContext("2d", { willReadFrequently: true }).clearRect(0,0, 1080, 732)
        //     canvasState.getCanvas().current.getContext("2d", { willReadFrequently: true }).drawImage(image, 0, 0, 1080, 732)
        // }
	};
    return (
        <div className={cl.button}>
            <InputLabel htmlFor="file-input">
                <img 
                    src={"upload.png"} 
                    alt={"upload"}
                    title='Загрузить изображение'
                    style={{ width: 45, height: 45}}
                />
            </InputLabel>
            <Input
                id="file-input"
                type="file"
                hidden
                inputProps={{
                    accept: 'image/*', // Можете указать типы файлов, которые разрешены
                }}
                onChange={handleFileChange}
            />
		</div>
    )
};

export default UploadButton;