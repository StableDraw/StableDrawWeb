import React, { useEffect, useState } from 'react'
import cl from './Parametrs.module.css'
import { Tooltip } from '@mui/material'
import canvasState from '../../../../../store/canvasState.tsx'
import { observer } from 'mobx-react-lite'
import testMob from '../../../../../store/neuralWindow.jsx'


const imagesToBase64 = files => {

	return new Promise(resolve => {
		let baseURLs = [];
		let promises = []
		for (let file of files) {
			let reader = new FileReader();

			promises.push(
				new Promise(innerResolve => {
					reader.readAsDataURL(file);
					reader.onload = () => {
						const baseURL = reader.result;
						baseURLs.push(baseURL);
						innerResolve(); // Resolve inner promise when the file is read
					};
				}));
		}

		// Wait for all promises to resolve before resolving the main promise
		Promise.all(promises).then(() => {
			resolve(baseURLs);
		});
	});
};

const DownloadImg = observer(({ closeWindow, closeParam, setSendImages, sendImages }) => {
	const [imgWidthMax, setImgWidthMax] = useState(548);
	const canvasImg = canvasState.getImgSrc()
	const images = testMob.neuralWindowImages;

	useEffect(() => {
		if (sendImages.length <= 4) {
			setSendImages(images);
			if (canvasImg && sendImages.length < 4) {
				setSendImages([...images, `${canvasImg}`])
			}
		}
	}, [canvasImg])

	useEffect(() => {
		selectImgMaxWidth();
		if (sendImages.length < 4){
			testMob.setNeuralWindowImages([...sendImages]);
		}
	}, [sendImages])

	const handleFileInputChange = e => {
		let files = e.target.files;

		if (files.length <= 4 && (sendImages.length + files.length) <= 4) {
			imagesToBase64(files)
				.then(result => {
					setSendImages([...sendImages, ...result])
				})
				.catch(err => {
					console.log("Произошла ошибка при попытке загрузить img")
					console.log(err);
				});
		} else {
			alert("Максимально возможное количество загруженных картинок - 4")
		}
	}

	const closeModal = () => {
		closeWindow(false)
		closeParam(false)
	}

	const deletePicture = (index) => {
		sendImages.splice(index, 1) // удаляет 1 элемент с заданным индексом 
		setSendImages([...sendImages])
	}

	const selectImgMaxWidth = () => {

		if (sendImages.length === 1)
			setImgWidthMax(cl.img_1)

		if (sendImages.length === 2)
			setImgWidthMax(cl.img_2)

		if (sendImages.length === 3)
			setImgWidthMax(cl.img_3)

		if (sendImages.length === 4)
			setImgWidthMax(cl.img_4)
	}

	return (
		<div className={!Boolean(sendImages.length) ? cl.image : cl.image__withImages}>
			{!Boolean(sendImages.length) && <span className={`${cl.txt} ${cl.loadTxt}`}>Загрузить изображение</span>}
			<div className={cl.pictures}>
				{
					Boolean(sendImages.length) ? sendImages.map((img, i) =>
						<div className={cl.picture}>
							<img className={`${cl.img_1} ${imgWidthMax}`} key={i} src={img} alt='' />

							{sendImages.length < 4 && <Tooltip title='Загрузить с ПК' placement='top'>
								<label className={`${cl.addBtn}`}>
									<img className={cl.addImg} src='/neuralWindow/addImg.svg' alt='' />
									<input
										style={{ display: 'none', background: 'none' }}
										type='file'
										accept="image/png, image/jpeg, image/jpg"
										multiple={true}
										onChange={handleFileInputChange} />
								</label>
							</Tooltip>}

							<Tooltip title='Удалить' placement='top'>
								<button className={`${cl.imgBtn} ${cl.deleteBtn}`} onClick={() => { deletePicture(i) }}>
									<img src='/neuralWindow/deleteImg.svg' alt='' />
								</button>
							</Tooltip>
						</div>
					) : <img className={cl.img_1} src='/neuralWindow/startImg.png' alt='' />
				}
			</div>
			{
				!Boolean(sendImages.length) && <>
					<div className={cl.download}>
						<Tooltip title='Назад к редактору' placement='top'>
							<button className={cl.imgBtn} onClick={() => closeModal()}>
								<img src='/neuralWindow/photoEdit.svg' alt='' />
							</button>
						</Tooltip>
						<Tooltip title='Загрузить с ПК' placement='top'>
							<label className={`${cl.imgBtn}`}>
								<img src='/neuralWindow/addImg.svg' alt='' />
								<input
									style={{ display: 'none', background: 'none' }}
									type='file'
									accept="image/png, image/jpeg, image/jpg"
									multiple={true}
									onChange={handleFileInputChange} />
							</label>
						</Tooltip>
					</div>
					<Tooltip title='Удалить' placement='top'>
						<button className={`${cl.imgBtn} ${cl.deleteBtn}`} onClick={() => setSendImages([])}>
							<img src='/neuralWindow/deleteImg.svg' alt='' />
						</button>
					</Tooltip>
				</>
			}


		</div>
	)
})

export default DownloadImg