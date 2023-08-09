import React, { useEffect, useState } from "react";
import api from '../../api/api'
import loadClasses from './styles/loadTex.module.css';

export const Loader = ({ call }) => {
	const [drag, setDrag] = useState(false);

	const dragStartHandler = (e) => {
		e.preventDefault();
		setDrag(true)
	};

	const dragLeaveHandler = (e) => {
		e.preventDefault();
		setDrag(false);
	}


	async function Send(img) {
		try {
			const data = await api.LoadTexture(img)
			const texes = data.data.map((el) => "https://localhost:44404/api/image/" + el)

			call([...texes])
			return data
		} catch (e) {
			console.error(e);
			throw e;
		}
	}

	const onDropHandler = (e) => {
		e.preventDefault();
		let files = [...e.dataTransfer.files];
		let formData = new FormData();
		
		formData.append(`file`, files[0]);
		formData.append("Content-Type", 'multipart/form-data')
		
		Send(formData)

		setDrag(false);
	};

	return (
		<div className={loadClasses.loadImg}>
			{drag ?
				<div className={loadClasses.drag_loadImg}
					onDragLeave={e => dragLeaveHandler(e)}
					onDrop={e => onDropHandler(e)}
					onDragOver={e => dragStartHandler(e)}>
					Отпустите файл, чтобы загрузить его
				</div> :
				<div className={loadClasses.drag_loadImg}
					onDragStart={e => dragStartHandler(e)}
					onDragLeave={e => dragLeaveHandler(e)}
					onDragOver={e => dragStartHandler(e)}>
					Перетащите текстуру, чтобы загрузить её
				</div>}

		</div>
	)
};