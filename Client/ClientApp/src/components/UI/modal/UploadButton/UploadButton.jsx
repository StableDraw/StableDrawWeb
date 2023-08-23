import React, {useState} from 'react';
import cl from './UploadButton.module.css'
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
import Content1 from "../../BabylonModule/Content1";

import { createTheme } from '@mui/material/styles';
import {  Typography, Input, InputLabel, } from '@mui/material';
const UploadButton = () => {
  
    const handleFileChange = (event) => {
		let files = [...event.target.files];
		console.log("файлы c кнопки:", files);

		let formData = new FormData();
		formData.append(`file`, files[0]);
		formData.append("Content-Type", 'multipart/form-data');
		// send(formData);
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