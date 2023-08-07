import React from "react";
import { useState } from "react";
import { Button, Card, Typography, } from '@mui/material';
import api from '../../api/api'

export const Loader = () => {
	const [drag, setDrag] = useState(false);

	const dragStartHandler = (e) => {
		e.preventDefault();
		setDrag(true)
	};

	const dragLeaveHandler = (e) => {
		e.preventDefault();
		setDrag(false);
	}

	async function data(){
		const data = await api.connect

		return data
	}
	
	const onDropHandler = (e) => {
		e.preventDefault();
		setDrag(false);
		let files = [...e.dataTransfer.files];
	};





	return (
		<div style={{
			display:'flex',
			alignItems:'center',
			justifyContent:'center',
			borderStyle: 'dashed',
			borderColor: '#1976d2',
			width: '400px',
			height: '100px',
			borderRadius: '20px',
		}}>

			{drag ? 
			<div style={{width: '390px', height: '95px',borderRadius: '20px', display:'flex', alignItems:'center', justifyContent:'center',}}
			onDragLeave={e=>dragLeaveHandler(e)} 
			onDrop={e => onDropHandler(e)}>
				Отпустите файл, чтобы загрузить его
			</div> :
			<div style={{width: '390px', height: '95px',borderRadius: '20px', display:'flex', alignItems:'center', justifyContent:'center',}}
				onDragStart={e=>dragStartHandler(e)}
				onDragLeave={e=>dragLeaveHandler(e)}
				onDragOver={e=>dragStartHandler(e)}>
					Перетащите текстуру, чтобы загрузить её
					</div>}

		</div>
	)
};