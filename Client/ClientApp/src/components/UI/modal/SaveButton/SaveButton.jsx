import React, {useState} from 'react';
import cl from './SaveButton.module.css'
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
import {  Typography, Input, InputLabel, } from '@mui/material';


import Content1 from "../../BabylonModule/Content1";
const SaveButton = () => {
    
    const handleFileChange = (event) => {
		let files = [...event.target.files];
		console.log("файлы c кнопки:", files);

		let formData = new FormData();
		formData.append(`file`, files[0]);
		formData.append("Content-Type", 'multipart/form-data');
	}
    return (
        <div className={cl.button} >
            <InputLabel htmlFor="file-input">
                <img 
                src={"save.png"} 
                alt={"save"}
                title='Сохранить изображение'
                style={{ width: 45, height: 45}}/>
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

export default SaveButton