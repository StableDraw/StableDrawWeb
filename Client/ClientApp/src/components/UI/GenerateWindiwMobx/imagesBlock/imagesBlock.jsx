import React, { useEffect, useState } from 'react'
import cl from './imagesBlock.module.css'
import { Tooltip } from '@mui/material'
import canvasState from '../../../../store/canvasState.tsx'
import { observer } from 'mobx-react-lite'
import testMob from '../../../../store/neuralWindow.jsx'
import { imagesToBase64 } from '../parametrs/Parametrs/base64Converter.jsx'

const ImagesBlock = observer(({ closeWindow, closeParam, setSendImages, sendImages }) => {
	const [imgWidthMax, setImgWidthMax] = useState(548);
	const [imgAmount, setImgAmount] = useState(1);
	const canvasImg = canvasState.getImgSrc();
	const images = testMob.neuralWindowImages;

	useEffect(() => {
		setImgAmount(testMob.maxImageAmount)
	}, [testMob.activeNeuralName])

	useEffect(() => {
		if (sendImages.length <= imgAmount) {
			setSendImages(images);

			if (canvasImg && sendImages.length < imgAmount) {
				setSendImages([...images, `${canvasImg}`])
			}
		}
	}, [canvasImg])

	useEffect(() => {
		selectImgMaxWidth();
		if (sendImages.length <= imgAmount) {
			testMob.setNeuralWindowImages([...sendImages]);
		}
	}, [sendImages])

	const handleFileInputChange = e => {
		let files = e.target.files;

		if (files.length <= imgAmount && (sendImages.length + files.length) <= imgAmount) {
			imagesToBase64(files)
				.then(result => {
					setSendImages([...sendImages, ...result])
				})
				.catch(err => {
					console.log("Произошла ошибка при попытке загрузить img")
					console.log(err);
				});
		} else {
			if (imgAmount)
				alert(`Максимально возможное количество загруженных картинок для текущей нейросети - ${imgAmount}`)
		}
	}

	const closeModal = () => {
		closeWindow()
		closeParam(false)
	}

	const deletePicture = (index) => {
		sendImages.splice(index, 1) // удаляет 1 картинку с заданным индексом 
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
				<div className={sendImages.length !== imgAmount && sendImages.length ? `${cl.pictures} ${cl.pictures__attention}` : cl.pictures}>
					{
						<>
							{sendImages.length !== imgAmount && Boolean(sendImages.length) && 
								<span className={cl.attentionTxt}> Необходимое количество изображений для текущей нейросети - {imgAmount}</span>}
							{Boolean(sendImages.length) ? sendImages.map((img, i) =>
								<div key={i + 1} className={cl.picture}>
									<img className={`${cl.img_1} ${imgWidthMax}`} key={i} src={img} alt='' />

									{sendImages.length < imgAmount && <Tooltip title='Загрузить с ПК' placement='top'>
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
							) : <img className={cl.img_1} src='/neuralWindow/startImg.png' alt='' />}
						</>

					}
				</div>
			{
				!Boolean(sendImages.length) &&
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
			}
		</div>
	)
})

export default ImagesBlock