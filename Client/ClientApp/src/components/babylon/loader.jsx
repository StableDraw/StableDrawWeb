import React, {useState} from "react";
import api from '../../api/api'

export const Loader = ({call}) => {
	const [drag, setDrag] = useState(false);

	const dragStartHandler = (e) => {
		e.preventDefault();
		setDrag(true)
	};

	const dragLeaveHandler = (e) => {
		e.preventDefault();
		setDrag(false);
	}

	
	async function Send(File) {
		try {
			const data = await api.LoadFile(File)
			const texes = data.data.map((el)=> "https://localhost:44404/api/image/" + el)
			console.log(texes);
			call([...texes])
			return data
		} catch (e) {
			console.error(e);
			throw e;
		}
	}

	// console.log(texture)
	const onDropHandler = (e) => {
		e.preventDefault();
		let files = [...e.dataTransfer.files];
		
		let formData = new FormData();
		formData.append("file", files[0]);
		formData.append("Content-Type", 'multipart/form-data')
		
		const res = Send(formData)
		setDrag(false);
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
			onDrop={e => onDropHandler(e)}
				 onDragOver={e=>dragStartHandler(e)}>
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