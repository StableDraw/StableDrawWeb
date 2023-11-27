import React, { useEffect, useState } from 'react'
import cl from './Parametrs.module.css'
import { Tooltip } from '@mui/material'
import canvasState from '../../../../../store/canvasState.tsx'
import { observer } from 'mobx-react-lite'

const getBase64 = file => {
	return new Promise(resolve => {
		let baseURL = "";
		let reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = () => {
			baseURL = reader.result;
			resolve(baseURL);
		};
	});
};

const DownloadImg = observer(({ closeWindow, closeParam, setRenderValue }) => {
	let [file, setFile] = useState()

	//никогда не пытайся приводить значение к строковому типу, которое потенциально
	//может быть undefined или null, т.к Boolean('undefined') = true
	// по этой причине у тебя в src 'undefined' передавался

	const img = canvasState.getImgSrc()

	useEffect(() => {
		if (img)
			setRenderValue(`${img}`)
	}, [img])

	const handleFileInputChange = e => {
		let file = e.target.files[0];
		getBase64(file)
			.then(result => {
				setFile(`${result}`)
				setRenderValue(`${result}`)
			})
			.catch(err => {
				console.log(err);
			});
	}

	const closeModal = () => {
		closeWindow(false)
		closeParam(false)
	}

	console.log();

	return (
		<div className={cl.image}>
			<img className={cl.img} src={file ? file : (img ? `${img}` : '/neuralWindow/startImg.png')} alt='' />
			<div className={cl.download}>
				<Tooltip title='Дорисовать' placement='top'>
					<button className={cl.imgBtn} onClick={() => closeModal()}>
						<img src='goToCanvas.png' alt='' />
					</button>
				</Tooltip>
				<Tooltip title='Загрузить с ПК' placement='top'>
					<label className={cl.imgBtn}>
						<img src='addImage.png' alt='' />
						<input style={{ display: 'none', background:'none' }} type='file' multiple={true} onChange={handleFileInputChange} />
					</label>
				</Tooltip>
				<Tooltip title='Убрать' placement='top'>
					<button className={cl.imgBtn} onClick={() => setFile()}>
						<img src='deleteImg.png' alt='' />
					</button>
				</Tooltip>

			</div>
		</div>
	)
})

export default DownloadImg